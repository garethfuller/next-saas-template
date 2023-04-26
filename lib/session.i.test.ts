import { describe, it, expect, beforeEach } from 'vitest'
import { handleNewSession } from './session'
import { db } from './db'
import { User } from '@prisma/client'

describe('handleNewSession', () => {
  describe('For previously unregistered user', () => {
    let newUser: User
    beforeEach(async () => {
      newUser = await db.user.create({ data: { email: 'test@test.com' } })
      await handleNewSession(newUser.id)
    })

    it('should create an api key', async () => {
      const apiKey = await db.apiKey.findFirst({
        where: { userId: newUser.id },
      })
      expect(apiKey?.token).toBeTruthy()
    })

    it('should not create a billing record', async () => {
      const billing = await db.billing.findFirst({
        where: { userId: newUser.id },
      })
      expect(billing).toBeFalsy()
    })
  })

  describe('For user with existing stripe subscription', () => {
    let stripeUser: User
    beforeEach(async () => {
      stripeUser = await db.user.create({
        data: { email: 'joe@bloggs.com' },
      })
      await handleNewSession(stripeUser.id)
    })

    it('should create an api key', async () => {
      const apiKey = await db.apiKey.findFirst({
        where: { userId: stripeUser.id },
      })
      expect(apiKey?.token).toBeTruthy()
    })

    it('should not create a billing record', async () => {
      const billing = await db.billing.findFirst({
        where: { userId: stripeUser.id },
      })
      expect(billing?.stripeSubscriptionId).toBeTruthy()
    })

    it("doesn't create more than one api key", async () => {
      await handleNewSession(stripeUser.id)
      const apiKeys = await db.apiKey.findMany({
        where: { userId: stripeUser.id },
      })
      expect(apiKeys.length).toBe(1)
    })

    it("doesn't create more than one billing record", async () => {
      await handleNewSession(stripeUser.id)
      const billings = await db.billing.findMany({
        where: { userId: stripeUser.id },
      })
      expect(billings.length).toBe(1)
    })
  })
})
