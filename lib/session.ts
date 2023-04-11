import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { User as NextAuthUser } from 'next-auth'
import { db } from './db'
import { User } from '@prisma/client'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getSessionUser(): Promise<NextAuthUser | undefined> {
  const session = await getSession()

  return session?.user
}

export async function getCurrentUser(): Promise<User | null> {
  const sessionUser = await getSessionUser()

  if (!sessionUser) return null

  return db.user.findUnique({
    where: {
      id: sessionUser?.id,
    },
  })
}
