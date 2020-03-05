const DEFAULT_OUTPUT = {
  path: `${process.env.PWD}/dist`,
  fileName: 'test',
  cssFileName: 'iconfont-web',
};

module.exports = {
  MAX_UNICODE_NUM: 1048576,
  startUnicodeHex: 'e601',
  PluginPrefixLog: '\n Svg2Iconfont-',
  DEFAULT_OUTPUT,
  DEFAULT_OPTIONS: {
    assetsPath: null,
    output: DEFAULT_OUTPUT,
  },
};
