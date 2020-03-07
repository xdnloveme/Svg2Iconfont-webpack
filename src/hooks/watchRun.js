const { error } = require('../log');
const fontCreator = require('../core/fontCreator');

module.exports = options => {
  return async function() {
    try {
      const { buffers, iconList } = await fontCreator(options.assetsPath, options.output);
      this.cacheBuffers = buffers;
      this.iconList = iconList;
    } catch (e) {
      error(e);
    }
  };
};
