const config = require('../config')

module.exports = function(req, res, next) {
  let data = Object.assign({}, config.robots)
  res.set('Content-Type', 'text/plain')
  res.set('Cache-Control', 'public, max-age=900')
  res.render('robots', data)
}
