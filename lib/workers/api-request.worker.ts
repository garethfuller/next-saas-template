import { buildWorker } from './worker.factory'

export type ApiRequestJobData = {
  example: string
}

export const queueName = 'api-request-queue'

async function processJob(data: ApiRequestJobData) {
  console.log('Processing job', data)
}

export const { jobQueue, worker } = buildWorker<ApiRequestJobData>(
  queueName,
  processJob
)
