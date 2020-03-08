const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const browserify = require('browserify')
const flushWriteStream = require('flush-write-stream')
const minifyStream = require('minify-stream')
const pathmodify = require('pathmodify')
const browserifyCache = require('browserify-cache-api')

var uglifyOpts = {
  global: true,
  mangle: {
    safari10: true,
  },
}

const minifyOptions = {
  safari10: true,
  sourceMap: false,
}

function output(file, rename) {
  const stream = fs.createWriteStream(file)

  if(!rename) return stream

  const hash = crypto.createHash('sha1')

  function onwrite (chunk, enc, cb) {
    hash.update(chunk)
    stream.write(chunk, cb)
  }

  function onend (cb) {
    stream.end()

    const rev = hash.digest('hex')
    const filename = path.basename(file)
    const dirname = path.dirname(file)

    const name = rename(filename, rev)
    const dest = path.resolve(dirname, name)

    this.emit('name', name)
    this.emit('remap', { from: filename, to: name })

    fs.rename(file, dest, cb)
  }
  return flushWriteStream(onwrite, onend)
}

function minified(file, rename) {
  return minifyStream(minifyOptions).pipe(output(file, rename))
}

function renameRevision(bundleName, rev) {
  const extname = path.extname(bundleName)
  const filename = path.basename(bundleName, extname)
  const dirname = path.dirname(bundleName)

  return path.join(dirname, `${filename}-${rev.slice(0, 10)}${extname}`)
}

create.minified = minified
create.output = output
create.revision = renameRevision

const browserifyOpts = {}

function create(entry, {
  stream = output,
  options = browserifyOpts
} = {}) {
  let bundle = browserify(entry, options)

  if(stream === minified) {
    bundle = bundle.transform(require.resolve('uglifyify'), uglifyOpts)
  }

  bundle = bundle.plugin(pathmodify, {})

  if(process.env.CACHE) {
    browserifyCache(bundle, {cacheFile: 'browserify-cache.json'});
  }

  return bundle
}

module.exports = create
