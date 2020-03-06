module.exports = fontOptions => {
  const { fontFamily, fontSize } = fontOptions;

  return {
    '.icon-iconfont': {
      font: `normal normal normal ${fontSize}px/1 "${fontFamily}";`,
    },
  };
};
