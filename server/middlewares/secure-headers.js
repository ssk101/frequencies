const config = require('../config')

module.exports = function(opts = {}) {
  return function(req, res, next) {
    if(config.httpsOnly) {
      if(req.secure) {
        res.setHeader('Strict-Transport-Security', 'max-age=900')
        next()
      } else {
        res.redirect(`https://${req.headers.host}${req.url}`)
      }
    } else {
      next()
    }
  }
}
