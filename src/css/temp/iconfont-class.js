module.exports = fontOptions => {
  const { cssPrefix, fontFamily, fontSize } = fontOptions;
  let obj = {}
  obj[`[class^=\"${cssPrefix}\"], [class*=\" ${cssPrefix}\"]`]=
    {
      'font-family': `'${fontFamily}' !important;`,
      '-webkit-font-smoothing': 'antialiased;',
      '-moz-osx-font-smoothing': 'grayscale;',
      'font-style': 'normal;',
      'font-size': `${fontSize}px`,
    };
  return obj;
};
