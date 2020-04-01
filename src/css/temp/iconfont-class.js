module.exports = fontOptions => {
  const { cssPrefix, fontFamily } = fontOptions;
  let obj = {}
  obj[`[class^=\"${cssPrefix}\"], [class*=\" ${cssPrefix}\"]`]=
    {
      'font-family': `'${fontFamily}' !important;`,
      '-webkit-font-smoothing': 'antialiased;',
      '-moz-osx-font-smoothing': 'grayscale;',
      'font-style': 'normal;'
      // font: `normal normal normal ${fontSize}px/1 "${fontFamily}";`,
    };
  return obj;
};
