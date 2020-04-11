const compilation = require('./compilation');
const make = require('./make');
const watchRun = require('./watchRun');
const run = require('./run');
const afterCompile = require('./afterCompile');

module.exports = {
  compilation,
  make,
  watchRun,
  run,
  afterCompile,
};
