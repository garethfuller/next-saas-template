import { db } from '../db'
import { User as PrismaUser } from '@prisma/client'
import { ApiKey } from './api-key'
import { stripe } from '../services/stripe/client'

type UserData = (PrismaUser & { apiKey: ApiKey | null }) | null

export class User {
  data?: UserData

  constructor(public id: string) {}

  async fetch() {
    return (this.data = await db.user.findUnique({
      where: {
        id: this.id,
      },
      include: {
        apiKey: true,
      },
    }))
  }

  async initApiKey() {
    if (!this.data) await this.fetch()

    if (this.data?.apiKey) return this.data.apiKey

    return db.user.update({
      where: {
        id: this.id,
      },
      data: {
        apiKey: {
          create: {
            token: ApiKey.generateToken(),
          },
        },
      },
    })
  }

  async syncStripeData() {
    if (!this.data) await this.fetch()
    if (!this.data?.email) return

    try {
      const {
        data: [customer],
      } = await stripe.customers.list({
        email: this.data.email,
        limit: 1,
        expand: ['data.subscriptions'],
      })

      const subscription = customer.subscriptions?.data[0]

      if (!subscription) return

      await db.user.update({
        where: {
          id: this.id,
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
