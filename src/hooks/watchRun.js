const { error } = require('../log');
const fontCreator = require('../core/fontCreator');
const path = require('path');

module.exports = pluginOptions => {
  return async function(...args) {
    try {
      const callback = args[1];
      const { buffers, iconList } = await fontCreator(pluginOptions.assetsPath, pluginOptions.output);
      this.cacheBuffers = buffers;
      this.iconList = iconList;

      if (this.previewServer) {
        this.previewServer.send(this.iconList);
      }

      callback();
    } catch (e) {
      error(e);
    }
  };
};
