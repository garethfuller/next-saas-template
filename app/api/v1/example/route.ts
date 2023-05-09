import { jobQueue, queueName } from '@/lib/workers/api-request.worker'
import { NextResponse } from 'next/server'

export async function GET() {
  await jobQueue.add(queueName, { example: 'data' })
  return new NextResponse(JSON.stringify({ message: 'Hello World' }), {
    status: 200,
  })
}
