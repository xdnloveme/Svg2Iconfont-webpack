const { compilation, make, watchRun } = require('./src/hooks');
const { error } = require('./src/log');
const { DEFAULT_OUTPUT, DEFAULT_OPTIONS } = require('./src/constant');

const transactionHOF = function(f, ...args) {
  if (typeof f !== 'function') {
    throw new Error('hof argument function expected ');
  }
  return f(...args).bind(this);
};

module.exports = class Svg2IconfontWebpack {
  constructor(options = {}) {
    this.init({
      ...DEFAULT_OPTIONS,
      ...options,
    });
  }

  init(options) {
    const { output = DEFAULT_OUTPUT } = options;
    this.options = options;
    this.options.output = Object.assign(DEFAULT_OUTPUT, output);
  }

  apply(compiler) {
    compiler.hooks.watchRun.tap('Svg2IconfontWebpack', transactionHOF(watchRun, this.options));

    compiler.hooks.compilation.tap('Svg2IconfontWebpack', transactionHOF(compilation, this.options));

    compiler.hooks.make.tap('Svg2IconfontWebpack', transactionHOF(make, this.options));

    compiler.hooks.invalid.tap('Svg2IconfontWebpack', e => error(e));
  }
};
