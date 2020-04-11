const { error } = require('../log');
const fontCreator = require('../core/fontCreator');

module.exports = pluginOptions => {
  return async function() {
    try {
      const { buffers, iconList } = await fontCreator(pluginOptions.assetsPath, pluginOptions.output);
      this.cacheBuffers = buffers;
      this.iconList = iconList;
    } catch (e) {
      error(e);
    }
  };
};
