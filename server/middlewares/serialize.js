module.exports = function(cb) {
  return async function(req, res, next) {
    try {
      const response = await cb(req, res, next)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}
