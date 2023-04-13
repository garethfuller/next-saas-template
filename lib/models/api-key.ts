import crypto from 'crypto'
import { db } from '../db'

export class ApiKey {
  constructor(public id: string) {}

  static generateToken(): string {
    return crypto.randomUUID()
  }

  static async validToken(token: string): Promise<boolean> {
    const apiKey = await db.apiKey.findUnique({ where: { token } })
    return !!apiKey && !apiKey.revokedAt
  }
}
