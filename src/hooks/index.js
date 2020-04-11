const compilation = require('./compilation');
const watchRun = require('./watchRun');
const run = require('./run');
const afterCompile = require('./afterCompile');
const emit = require('./emit');

module.exports = {
  compilation,
  watchRun,
  run,
  afterCompile,
  emit,
};
