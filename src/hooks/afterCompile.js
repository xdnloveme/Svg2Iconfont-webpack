const { error } = require('../log');

module.exports = pluginOptions => {
  return function(compilation) {
    try {

      // add watch - file dep
      const { assetsPath } = pluginOptions;
      const watchDependencies = this.iconList.map(item => `${assetsPath}/${item.oppositePath}`);

      for(let dep of watchDependencies) {
        compilation.fileDependencies.add(dep)
      }
      
    } catch (e) {
      error(e);
    }
  };
};
