const { error } = require('../log');
const fontCreator = require('../core/fontCreator');

module.exports = options => {
  return async function() {
    try {
      const { buffers, iconList } = await fontCreator(options.assetsPath, options.output);
      this.cacheBuffers = buffers;
      this.iconList = iconList;
      if (this.previewServer) {
        this.previewServer.send('阿拉拉了');
      }
    } catch (e) {
      error(e);
    }
  };
};
