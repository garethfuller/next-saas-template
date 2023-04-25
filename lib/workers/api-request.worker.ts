import { buildWokrer } from './worker.factory'

export type ApiRequestJobData = {
  example: string
}

async function processJob(data: ApiRequestJobData) {
  console.log('Processing job', data)
}

export const { jobQueue, worker } = buildWokrer<ApiRequestJobData>(
  'api-request-queue',
  processJob
)
