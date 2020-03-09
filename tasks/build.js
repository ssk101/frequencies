const fs = require('fs')
const fse = require('fs-extra')
const bundler = require('./bundle')
const path = require('path')
const entry = './src/index.js'

if(!fs.existsSync(entry)) {
  return console.warn('No entry found')
}

console.time('build time')

var out = path.join(__dirname, '..', 'build')

fse.ensureDirSync(out)
fse.emptyDirSync(out)

module.exports = bundler(entry, { stream: bundler.minified })
  .bundle()
  .pipe(bundler.minified(`${out}/application.js`))
  .on('finish', () => {
    console.log('build end')
    console.timeEnd('build time')
  })
