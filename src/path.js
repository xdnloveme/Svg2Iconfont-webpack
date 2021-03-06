const path = require('path')

const resolve = currentPath => {
  return path.resolve(__dirname, './', currentPath)
}

const resolvePWD = currentPath => {
  return path.resolve(process.cwd(), './', currentPath);
}

module.exports = {
  resolve,
  resolvePWD,
}
