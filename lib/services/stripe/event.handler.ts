import Stripe from 'stripe'
import { stripe } from './client'
import { db } from '@/lib/db'

export class EventHandler {
  session: Stripe.Checkout.Session

  constructor(public readonly event: Stripe.Event) {
    this.session = event.data.object as Stripe.Checkout.Session
  }

  public async handle() {
    switch (this.event.type) {
      case 'checkout.session.completed':
        return this.syncStripeData()
      case 'customer.subscription.created':
        return this.syncStripeData()
      case 'customer.subscription.updated':
        return this.syncStripeData()
      case 'customer.subscription.deleted':
        return this.syncStripeData()
      case 'invoice.payment_succeeded':
        return this.syncStripeData()
      case 'invoice.payment_failed':
        return this.syncStripeData()
      default:
        return this.handleUnknownEvent()
    }
  }

  handleUnknownEvent() {
    throw new Error('Event not handled.')
  }

  private async syncStripeData() {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        this.session.subscription as string
      )

      const userId = this.session.client_reference_id
      if (!userId) throw new Error('No user ID found in session.')

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      })
    } catch (error) {
      throw new Error('Error syncStripeData', { cause: error })
    }
  }
}
