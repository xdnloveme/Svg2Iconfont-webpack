const { error } = require('../log');
const fontCreator = require('../core/fontCreator');

module.exports = options => {
  return async function() {
    try {
      const buffers = await fontCreator(options.assetsPath, options.output);
      this.cacheBuffers = buffers;
    } catch (e) {
      error(e);
    }
  };
};
