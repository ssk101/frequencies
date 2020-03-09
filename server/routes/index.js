const router = require('express').Router()
const errorHandler = require('../middlewares/error-handler')
const hostUrl = require('../middlewares/host-url')

router.use(hostUrl())

router.get('/manifest.json', require('./manifest'))
router.get('/robots.txt', require('./robots'))

router.get('*', require('./star'))

router.use(errorHandler)

module.exports = router
