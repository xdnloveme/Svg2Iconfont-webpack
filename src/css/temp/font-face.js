module.exports = (fontFamily,outputOptions) => {
  const { fileName } = outputOptions;

  return {
    '@font-face': {
      'font-family': fontFamily,
      src: `url(./${fileName}.eot),
          url(./${fileName}.eot?#iefix) format('embedded-opentype'),
          url(./${fileName}.woff) format('woff'),
          url(./${fileName}.ttf) format('truetype'),
          url(./${fileName}.svg#iconfont) format('svg')`,
      'font-weight': 'normal',
      'font-style': 'normal'
    },
  };
};
