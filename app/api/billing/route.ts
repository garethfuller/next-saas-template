import { db } from '@/lib/db'
import { stripe } from '@/lib/services/stripe/client'
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function POST() {
  const userSession = await getSessionUser()
  if (!userSession) return redirect('/login')

  const user = await db.user.findUnique({ where: { id: userSession.id } })
  if (!user?.stripeCustomerId) return redirect('/dash')

  const session = await stripe.billingPortal.sessions.create({
    customer: user?.stripeCustomerId,
    return_url: 'http://localhost:3000/dash',
  })

  redirect(session.url)
}
