const { resolvePWD } = require('./path');

const DEFAULT_OUTPUT = {
  // dist path (readonly)
  path: resolvePWD('./dist'),
  fileName: 'test',
  cssFileName: 'iconfont-web',
};

module.exports = {
  // max unicode value
  MAX_UNICODE_NUM: 1048576,
  // start unicode value
  startUnicodeHex: 'e601',
  // prefix
  PluginPrefixLog: '\n Svg2Iconfont-',
  // output options
  DEFAULT_OUTPUT,
  // default all options
  DEFAULT_OPTIONS: {
    assetsPath: resolvePWD('./src/assets'),
    output: DEFAULT_OUTPUT,
  },
  // default font options
  DEFAULT_FONT_OPTIONS: {
    fontSize: 32,
    fontFamily: 'iconfont',
  },
};
