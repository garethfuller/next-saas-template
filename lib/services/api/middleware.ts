import { NextRequest, NextResponse } from 'next/server'

export async function apiMiddleware(req: NextRequest) {
  const isAuthorized = await authorized(req)
  if (!isAuthorized) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized: Invalid or missing API key' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const headers = new Headers(req.headers)
  headers.set('Content-Type', 'application/json')

  return NextResponse.next({
    request: {
      headers,
    },
  })
}

async function authorized(req: NextRequest): Promise<boolean> {
  const { ApiKey } = await import('@/lib/models/api-key')
  const authorization = req.headers.get('authorization') as string
  const authToken = authorization?.split(' ')[1]
  return ApiKey.validToken(authToken || '')
}
