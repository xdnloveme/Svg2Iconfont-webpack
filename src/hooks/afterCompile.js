const { error } = require('../log');
let once = false;

module.exports = pluginOptions => {
  return function(compilation) {
    try {
      // add watch - file dep once
      const { assetsPath } = pluginOptions;
      compilation.contextDependencies.add(assetsPath);
    } catch (e) {
      error(e);
    }
  };
};
