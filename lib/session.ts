import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { User as NextAuthUser } from 'next-auth'
import { db } from './db'
import { User, getUserById } from './models/user'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getSessionUser(): Promise<NextAuthUser | undefined> {
  const session = await getSession()

  return session?.user
}

export async function getCurrentUser() {
  const sessionUser = await getSessionUser()

  if (!sessionUser) return null

  return new User(sessionUser.id).fetch()
}

export async function handleNewSession(id: string) {
  const user = new User(id)

  await user.initApiKey()
  await user.syncStripeData()
}
