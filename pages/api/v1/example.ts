import { NextApiRequest, NextApiResponse } from 'next'
import { protectApiRoute } from './middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await protectApiRoute(req, res)
  return res.status(200).json({ message: 'Hello World' })
}
