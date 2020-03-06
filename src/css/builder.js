const postcss = require('postcss');
const postcssJs = require('postcss-js');
const { fontFace, iconfontClass } = require('./temp');

const builder = options => {
  const fontFaceTemp = fontFace(options.output);
  const iconfontClassTemp = iconfontClass(options.fontOptions)

  const style = {
    ...fontFaceTemp,
    ...iconfontClassTemp,
  };

  return postcss().process(style, { parser: postcssJs });
};

module.exports = builder;
