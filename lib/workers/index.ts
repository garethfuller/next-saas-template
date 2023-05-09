import { worker as apiRequestWorker } from './api-request.worker'

try {
  apiRequestWorker.run()
  console.log('Workers started...')
} catch (error) {
  console.log('Error starting workers:', error)
  apiRequestWorker.close()
}

process.on('SIGTERM', async () => {
  console.info(`SIGTERM signal received: closing all workers`)

  await apiRequestWorker.close()

  console.info(`All workers closed`)
})
