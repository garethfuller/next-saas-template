import { stripe } from '@/lib/services/stripe/client'
import { EventHandler } from '@/lib/services/stripe/event.handler'
import { NextApiRequest, NextApiResponse } from 'next'
import rawBody from 'raw-body'
import Stripe from 'stripe'

export const config = {
  api: {
    // Turn off the body parser so we can access raw body for verification.
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await rawBody(req)
  const signature = req.headers['stripe-signature'] as string

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
    return res.status(400).send(`Webhook Error: ${(error as Error).message}`)
  }

  res.status(200)
}
