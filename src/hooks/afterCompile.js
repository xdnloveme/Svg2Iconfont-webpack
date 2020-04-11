const { error } = require('../log');

module.exports = pluginOptions => {
  return function(compilation) {
    try {

      // add watch - file dep
      const { assetsPath } = pluginOptions;

      compilation.contextDependencies.add(assetsPath);
    } catch (e) {
      error(e);
    }
  };
};
