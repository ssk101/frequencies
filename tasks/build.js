const fs = require('fs')
const fse = require('fs-extra')
const bundler = require('./bundle')
const path = require('path')

if(!fs.existsSync('src/index.js')) {
  return console.warn('No entry found')
}

console.time('build time')

var out = path.join(__dirname, '..', 'build')

fse.ensureDirSync(out)
fse.emptyDirSync(out)

module.exports = bundler(
  path.join(__dirname, '..', 'src/index.js'), { stream: bundler.minified }
)
  .bundle()
  .pipe(bundler.minified(`${out}/application.js`))
  .on('finish', () => {
    console.log('build end')
    console.timeEnd('build time')
  })
