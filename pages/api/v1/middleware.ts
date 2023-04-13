import { ApiKey } from '@/lib/models/api-key'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

async function authApiKey(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (result: any) => void
) {
  const { authorization } = req.headers
  const authToken = authorization?.split(' ')[1]
  const validToken = await ApiKey.validToken(authToken || '')

  if (!validToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  return next(true)
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (result: any) => void
  ) => void | Promise<void>
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export async function protectApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return Promise.all([
    runMiddleware(req, res, cors),
    runMiddleware(req, res, authApiKey),
  ])
}
