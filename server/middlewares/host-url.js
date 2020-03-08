module.exports = function(opts = {}) {
  return function(req, res, next) {
    req.hostUrl = req.protocol + '://' + req.get('host') + req.baseUrl
    next()
  }
}
