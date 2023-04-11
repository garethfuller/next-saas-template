import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import StripePricingTable from '@/components/sections/StripePricingTable'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  console.log(user)

  return (
    <div>
      <h1>Dashboard</h1>
      {user.stripeCustomerId ? (
        <form method="POST" action="/api/billing">
          <button type="submit">Manage billing</button>
        </form>
      ) : (
        <StripePricingTable user={user} />
      )}
    </div>
  )
}
