const { compilation, make, watchRun, run } = require('./src/hooks');
const { error, info } = require('./src/log');
const { DEFAULT_OUTPUT, DEFAULT_OPTIONS, DEFAULT_FONT_OPTIONS } = require('./src/constant');

const transactionHOF = function(f, options, context) {
  if (typeof f !== 'function') {
    throw new Error('hof argument function expected ');
  }
  return f.call(context, options).bind(context);
};

module.exports = class Svg2IconfontWebpack {
  cacheBuffers = {};

  constructor(options = {}) {
    info('constructor... prepare to compiling...')
    this.init({
      ...DEFAULT_OPTIONS,
      ...DEFAULT_FONT_OPTIONS,
      ...options,
    });
  }

  init(options) {
    const { output = DEFAULT_OUTPUT, fontOptions = DEFAULT_FONT_OPTIONS } = options;
    options.fontOptions = Object.assign(DEFAULT_FONT_OPTIONS, fontOptions);
    options.output = Object.assign(DEFAULT_OUTPUT, output);
    this.options = options;
  }

  apply(compiler) {
    const context = this;

    compiler.hooks.watchRun.tap('Svg2IconfontWebpack', transactionHOF(watchRun, this.options, context));

    compiler.hooks.run.tap('Svg2IconfontWebpack', transactionHOF(run, this.options, context));

    compiler.hooks.compilation.tap('Svg2IconfontWebpack', transactionHOF(compilation, this.options, context));

    compiler.hooks.make.tap('Svg2IconfontWebpack', transactionHOF(make, this.options, context));

    compiler.hooks.invalid.tap('Svg2IconfontWebpack', e => error(e));
  }
};
