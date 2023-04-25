// src/tests/helpers/reset-db.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const resetDb = async () => {
  await prisma.$transaction([
    prisma.apiKey.deleteMany(),
    prisma.billing.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
