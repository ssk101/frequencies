const config = require('../config')
const secureHeaders = require('../middlewares/secure-headers')
const cacheControl = require('../middlewares/cache-control')

function star(req, res) {
  req.config = config
  res.render('index', req)
}

module.exports = [
  secureHeaders(),
  cacheControl(),
  star,
]
