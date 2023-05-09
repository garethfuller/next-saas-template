import { NextRequest } from 'next/server'

export async function requestLoggger(req: NextRequest) {
  const {
    ip,
    cache,
    credentials,
    nextUrl: { origin },
  } = req

  let body = {}
  if (['POST', 'PUT'].includes(req.method)) {
    try {
      body = await req.json()
    } catch (error) {
      body = {}
    }
  }

  console.log(
    `[${new Date().toISOString()}] ${req.method} ${
      req.nextUrl.pathname
    } - ${JSON.stringify({
      ip,
      cache,
      credentials,
      body,
      headers: {
        'user-agent': req.headers.get('user-agent'),
        'authorization:': req.headers.get('authorization:'),
        'cache-control': req.headers.get('cache-control'),
      },
      origin,
    })}`
  )
}
