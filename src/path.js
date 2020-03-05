const path = require('path')

const resolve = currentPath => {
  return path.resolve(__dirname, './', currentPath)
}

module.exports = {
  resolve,
}
