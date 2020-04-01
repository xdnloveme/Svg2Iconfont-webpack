module.exports = (cssPrefix, icon) => {
  const { name, unicode } = icon;

  return {
    [`.${cssPrefix}-${name}::before`]: {
      content: `"\\${unicode}"`,
    },
  };
};
