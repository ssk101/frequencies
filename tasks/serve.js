const express = require('express')
const getPort = require('get-port');
const pug = require('pug')
const path = require('path')

let setup = Promise.resolve()

;(async function main() {
  process.env.HMR_PORT = process.env.HMR_PORT || (await getPort(3100))

  setup = new Promise((done, fail) => {
    require('./watch').on('finish', done).on('error', fail)
  })

  try {
    return require(path.join(__dirname, '..', 'server'))
  } catch (error) {
    console.warn('Warning:', error.message)
    console.warn('Falling back to static.')
  }

  const serverPorts = getPort.makeRange(3000, 3100)
  const INDEX = pug
    .compileFile(path.join(__dirname, '..', 'server/views/index.pug'))()
  const PORT = process.env.PORT || (await getPort({ port: serverPorts }))

  const app = express()
    .use(function index(req, res, next) {
      if(req.accepts('html') && !req.url.includes('.')) {
        return res.send(INDEX)
      }
      return setup.then(next).catch(next)
    })
    .use(express.static(path.join(__dirname, '..', 'build')))
    .use(express.static(path.join(__dirname, '..', 'public')))
    .listen(PORT, function onListen(server) {
      console.log(`Server listening at port ${PORT}`);
    })
}())
