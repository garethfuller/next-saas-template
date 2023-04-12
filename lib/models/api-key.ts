import crypto from 'crypto'

export class ApiKey {
  constructor(public id: string) {}

  static generateToken(): string {
    return crypto.randomUUID()
  }
}
