module.exports = (outputOptions, fontOptions) => {
  const { fileName } = outputOptions;
  const { fontFamily } = fontOptions;

  return {
    '@font-face': {
      'font-family': fontFamily,
      src: `url(./${fileName}.eot),
          url(./${fileName}.eot?#iefix) format('embedded-opentype'),
          url(./${fileName}.woff) format('woff'),
          url(./${fileName}.ttf) format('truetype'),
          url(./${fileName}.svg#iconfont) format('svg')`,
    },
  };
};
