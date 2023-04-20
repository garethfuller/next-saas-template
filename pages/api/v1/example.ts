import { NextApiRequest, NextApiResponse } from 'next'
import { protectApiRoute } from './middleware'
import { jobQueue, queueName } from '@/lib/workers/api-request.worker'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await protectApiRoute(req, res)
  await jobQueue.add(queueName, { example: 'data' })
  return res.status(200).json({ message: 'Hello World' })
}
