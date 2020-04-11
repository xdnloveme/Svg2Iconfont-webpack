const { error } = require('../log');
const fontCreator = require('../core/fontCreator');
const path = require('path');

module.exports = pluginOptions => {
  return async function() {
    try {
      const { buffers, iconList } = await fontCreator(pluginOptions.assetsPath, pluginOptions.output);
      this.cacheBuffers = buffers;
      this.iconList = iconList;

      if (this.previewServer) {
        this.previewServer.send(this.iconList);
      }
    } catch (e) {
      error(e);
    }
  };
};
