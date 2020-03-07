module.exports = icon => {
  const { name, unicode } = icon;

  return {
    [`.iconfont-${name}::before`]: {
      content: `"\\${unicode}"`,
    },
  };
};
