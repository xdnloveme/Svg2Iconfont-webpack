module.exports = (fontOptions, options) => {
  const { fontFamily, fontSize } = fontOptions;
  const { className } = options;

  return {
    [`.${className}`]: {
      font: `normal normal normal ${fontSize}px/1 "${fontFamily}";`,
    },
  };
};
