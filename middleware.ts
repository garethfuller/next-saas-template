import { NextRequest } from 'next/server'
import { apiMiddleware } from './lib/services/api/middleware'
import { requestLoggger } from './lib/logging'

export async function middleware(req: NextRequest) {
  requestLoggger(req)
  if (req.nextUrl.pathname.startsWith('/api/v1')) {
    return await apiMiddleware(req)
  }
}
