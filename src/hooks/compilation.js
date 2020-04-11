const { error } = require('../log');
const { isProd } = require('../env');

module.exports = pluginOptions => {
  return function(compilation) {
    try {
      const { output } = pluginOptions;
      
      const { publicPath } = this.options.output;

      compilation.plugin('html-webpack-plugin-before-html-processing', data => {
        // html assets
        data.assets.css.push(`${publicPath}css/${output.cssFileName}.css`);
        return data;
      });
    } catch (e) {
      error(e);
    }
  };
};
