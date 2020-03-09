const path = require('path')
const { existsSync } = require('fs')
const { execSync } = require('child_process')
const GIT_DIR = path.join(__dirname, '..', '..', '.git')

module.exports = function(opts = {}) {
  const meta = {
    DEPLOY_TIME: Date.now(),
  }

  if(GIT_DIR && existsSync(`${GIT_DIR}/.git`)) {
    meta.SOURCE_REF = execSync(
      `git --git-dir="${GIT_DIR}/.git" rev-parse HEAD`,
    ).toString('utf8').trim().substr(0, 7)
  }

  return Object.assign({}, process.env, meta)
}
