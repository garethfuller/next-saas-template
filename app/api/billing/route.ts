import { config } from '@/lib/config'
import { db } from '@/lib/db'
import { stripe } from '@/lib/services/stripe/client'
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function POST() {
  const userSession = await getSessionUser()
  if (!userSession) return redirect('/login')

  const user = await db.user.findUnique({
    where: { id: userSession.id },
    select: { billing: { select: { stripeCustomerId: true } } },
  })
  if (!user?.billing?.stripeCustomerId) return redirect('/dash')

  const session = await stripe.billingPortal.sessions.create({
    customer: user.billing.stripeCustomerId,
    return_url: `${config.appUrl}/dash`,
  })

  redirect(session.url)
}
