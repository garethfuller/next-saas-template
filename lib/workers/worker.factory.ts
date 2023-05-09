import { Job, Queue, Worker } from 'bullmq'
import { connection } from './config'

export function buildWorker<T>(
  queueName: string,
  processor: (data: T) => Promise<void>
) {
  const jobQueue = new Queue<T>(queueName, {
    connection,
  })

  const worker = new Worker<T>(
    queueName,
    async (job: Job) => {
      await processor(job.data)
    },
    { autorun: false, connection }
  )

  worker.on('active', (job) => {
    console.log(`${queueName}: Job id#${job.id} has started!`)
  })

  worker.on('completed', (job) => {
    console.log(`${queueName}: Job id#${job.id} has completed!`)
  })

  worker.on('failed', (job, err) => {
    console.log(
      `${queueName}: Job id#${job?.id} has failed with ${err.message}`
    )
  })

  process.on('SIGTERM', async () => {
    console.info(`SIGTERM signal received: closing queue ${queueName}`)

    await jobQueue.close()

    console.info(`Closed ${queueName}`)
  })

  return { jobQueue, worker }
}
