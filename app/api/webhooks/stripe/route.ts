import { stripe } from '@/lib/services/stripe/client'
import { EventHandler } from '@/lib/services/stripe/event.handler'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
    console.log('event', event)
    const stripeEventHandler = new EventHandler(event)
    await stripeEventHandler.handle()
  } catch (error) {
    return new Response(`Webhook Error: ${(error as Error).message}`, {
      status: 400,
    })
  }

  return new Response(null, { status: 200 })
}
