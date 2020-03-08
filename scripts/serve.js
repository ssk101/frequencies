const fs = require('fs')
const express = require('express')
const getPort = require('get-port');

let setup = Promise.resolve()

;(async function main() {
  process.env.HMR_PORT = process.env.HMR_PORT || (await getPort(3100))

  setup = new Promise((done, fail) => {
    require('./watch').on('finish', done).on('error', fail)
  })

  const serverPorts = getPort.makeRange(3000, 3100)

  const INDEX = (function () {
    return fs.readFileSync('./public/index.html', 'utf8')
  }())

  const PORT = process.env.PORT || (await getPort({ port: serverPorts }))

  const app = express()
    .use(function index(req, res, next) {
      if(req.accepts('html') && !req.url.includes('.')) {
        return res.send(INDEX)
      }
      return setup.then(next).catch(next)
    })
    .use(express.static('./build'))
    .use(express.static('./public'))
    .listen(PORT, function onListen(server) {
      console.log(`Server listening at port ${PORT}`);
    })
}())
