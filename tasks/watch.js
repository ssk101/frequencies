const bundler = require('./bundle')
const fse = require('fs-extra')
const path = require('path')

function watchify() {
  return bundle.bundle().pipe(bundler.output('build/application.js'))
}

fse.ensureDirSync('./build')
fse.emptyDirSync('./build')

const options = {
  cache: {},
  packageCache: {},
  debug: true,
  verbose: true,
}

const hmrOpts = {}

if(process.env.HMR_PORT) {
  Object.assign(hmrOpts, {
    port: process.env.HMR_PORT,
    url: `http://localhost:${process.env.HMR_PORT}`
  })
}

const bundle = bundler(path.join(__dirname, '..', 'src/index.js'), { options })
  .plugin(require.resolve('errorify'))
  .plugin(require.resolve('watchify'), {})
  .plugin(require.resolve('browserify-hmr'), hmrOpts)

bundle
  .on('update', () => {
    watchify()
  })
  .on('error', console.error)
  .on('log', console.log)

module.exports = watchify()
