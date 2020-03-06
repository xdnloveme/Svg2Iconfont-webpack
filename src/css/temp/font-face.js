module.exports = outputOptions => {
  const { fileName } = outputOptions;

  return {
    '@font-face': {
      'font-family': 'iconfont',
      src: `url(./${fileName}.eot),
          url(./${fileName}.eot?#iefix) format('embedded-opentype'),
          url(./${fileName}.woff) format('woff'),
          url(./${fileName}.ttf) format('truetype'),
          url(./${fileName}.svg#iconfont) format('svg')`,
    },
  };
};
