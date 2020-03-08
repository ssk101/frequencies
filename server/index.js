const { port } = require('./config')
const app = require('./app')
const server = require('http').createServer(app)

server.listen(port)

server.on('listening', () => {
  console.log(`Listening on ${port} with pid: ${process.pid}`)
})

process.on('SIGUSR2', () => {
  require('v8').writeHeapSnapshot()
})

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit()
  })
})
