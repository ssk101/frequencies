const fs = require('fs')
const fse = require('fs-extra')
const bundler = require('./bundle')


if(!fs.existsSync('src/index.js')) {
  return console.warn('No entry found')
}

console.time('build time')

var out = process.env.NODE_ENV == 'production'
  ? 'out'
  : 'build'

fse.ensureDirSync(`./${out}`)
fse.emptyDirSync(`./${out}`)

module.exports = bundler('src/index.js', { stream: bundler.minified })
  .bundle()
  .pipe(bundler.minified(`./${out}/application.js`))
  .on('finish', () => {
    console.log('build end')
    console.timeEnd('build time')
  })
