const fs = require('fs')
const fse = require('fs-extra')
const bundler = require('./bundle')


if(!fs.existsSync('src/index.js')) {
  return console.warn('No entry found')
}

console.time('build time')

fse.ensureDirSync('./build')
fse.emptyDirSync('./build')

module.exports = bundler('src/index.js', { stream: bundler.minified })
  .bundle()
  .pipe(bundler.minified('./build/application.js'))
  .on('finish', () => {
    console.log('build end')
    console.timeEnd('build time')
  })
