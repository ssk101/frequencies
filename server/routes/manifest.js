const config = require('../config')
const cacheControl = require('../middlewares/cache-control')

const defaults = {
  'name': config.title,
  'short_name': config.title,
  'display': 'standalone',
  'orientation': 'portrait-primary',
}

const data = Object.assign({}, defaults, config.manifest)

function handler(req, res) {
  res.json(data)
}

module.exports = [
  cacheControl({ttl: 300}),
  handler,
]
