const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const responseTime = require('response-time')
const favicon = require('serve-favicon')
const compression = require('compression')
const config = require('./config')
const routes = require('./routes')

const app = express()

app
  .enable('trust proxy')
  .disable('x-powered-by')
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'pug')
  .use(responseTime())
  .use(cors())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json({limit: '5MB'}))
  .use(bodyParser.raw({
    limit: '1MB',
    type: ['image/svg+xml'],
  }))
  .use(favicon(path.join(__dirname, '..', 'public', config.favicon)))
  .use(compression())
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(express.static(path.join(__dirname, '..', 'build')))
  .use(routes)

module.exports = app
