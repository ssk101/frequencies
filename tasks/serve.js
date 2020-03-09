const getPort = require('get-port')
const path = require('path')

;(async function main() {
  process.env.HMR_PORT = process.env.HMR_PORT || (await getPort(3100))
  require('./watch')
  return require(path.join(__dirname, '..', 'server'))
}())
