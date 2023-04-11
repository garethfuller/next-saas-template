import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { UserAccountNav } from '@/components/navs/UserAccountNav'
import { authOptions } from '@/lib/auth'

interface DashLayoutProps {
  children?: React.ReactNode
}

export default async function DashLayout({ children }: DashLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <div>
      <UserAccountNav user={user} />
      <main>{children}</main>
    </div>
  )
}
