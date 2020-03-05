const { resolve } = require('../path');
const { readFileAsync } = require('../utils');
const { error } = require('../log');

module.exports = options => {
  return async compilation => {
    try {
      const { output } = options;
      compilation.hooks.additionalAssets.tapAsync('Svg2IconfontWebpack', async cb => {
        const fileContent = await readFileAsync(resolve('./template/temp.css'));
        compilation.assets[`css/${output.cssFileName}.css`] = {
          source: () => {
            return fileContent;
          },
          size: () => {
            return Buffer.byteLength(fileContent, 'utf-8');
          },
        };
        cb();
      });
    } catch (e) {
      error(e);
    }
  };
};
