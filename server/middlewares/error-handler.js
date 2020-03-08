module.exports = (err, req, res, next) => {
  let ret = {}
  if(err.status && err.status !== 500) {
    ret = {
      error: err.message,
      message: err.message,
      details: err.details,
      requestId: req.sentry,
    }
  } else {
    ret = Object.assign({}, err, {
      error: err.error || err.message,
      message: err.message || err.error,
      details: err.details,
      requestId: req.sentry,
    })
  }

  res.status(err.status || 500)
    .json(ret)
}
