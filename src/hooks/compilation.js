const { error } = require('../log');

module.exports = options => {
  return compilation => {
    try {
      const { output } = options;
      compilation.plugin('html-webpack-plugin-before-html-processing', data => {
        data.assets.css.push(`/css/${output.cssFileName}.css`);
        return Promise.resolve(data);
      });
    } catch (e) {
      error(e);
    }
  };
};
