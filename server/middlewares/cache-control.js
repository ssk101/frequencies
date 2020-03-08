module.exports = function(opts = {}) {
  const scope = opts.private ? 'private' : 'public'
  const ttl = opts.ttl || 15

  return function(req, res, next) {
    res.setHeader('Cache-Control', `max-age=${ttl}, ${scope}`)
    next()
  }
}
