const postcss = require('postcss');
const postcssJs = require('postcss-js');
const { fontFace, iconfontClass, icon } = require('./temp');

const builder = function(options) {
  const iconList = this.iconList;

  if (!iconList) {
    return '';
  }

  const fontFaceTemp = fontFace(options.output);
  const iconfontClassTemp = iconfontClass(options.fontOptions);

  let iconClassHashTemp = {};
  for (let i = 0; i < iconList.length; i++) {
    const current = iconList[i];

    const splitStack = current.oppositePath.split('.');

    // remove suffix
    splitStack.pop();

    const name = splitStack.join('');
    // rename
    const formatName = name.split('/').join('-');

    const iconTemp = icon({
      name: formatName,
      unicode: current.unicode,
    });
    // assign
    iconClassHashTemp = Object.assign(iconClassHashTemp, iconTemp);
  }

  const style = {
    ...fontFaceTemp,
    ...iconfontClassTemp,
    ...iconClassHashTemp,
  };

  return postcss().process(style, { parser: postcssJs });
};

module.exports = builder;
