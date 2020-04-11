const { compilation, make, watchRun, run, afterCompile, emit } = require('./src/hooks');
const { info } = require('./src/log');
const { DEFAULT_OUTPUT, DEFAULT_OPTIONS, DEFAULT_FONT_OPTIONS } = require('./src/constant');
const Server = require('./src/preview/server');

const transactionHOF = function(f, options, context) {
  if (typeof f !== 'function') {
    throw new Error('hof argument function expected ');
  }
  return f.call(context, options).bind(context);
};

module.exports = class Svg2IconfontWebpack {
  constructor(options = {}) {
    info('constructor... prepare to compiling...');
    this.init({
      ...DEFAULT_OPTIONS,
      fontOptions: DEFAULT_FONT_OPTIONS,
      ...options,
    });
  }

  init(options) {
    const { output = DEFAULT_OUTPUT, fontOptions = DEFAULT_FONT_OPTIONS } = options;
    // merge options
    options.fontOptions = Object.assign(DEFAULT_FONT_OPTIONS, fontOptions);
    options.output = Object.assign(DEFAULT_OUTPUT, output);
    // mount prototype
    this.pluginOptions = options;
    this.cacheBuffers = {};
  }

  apply(compiler) {
    const { options } = compiler;

    this.options = options;

    const server = new Server(this, {
      options,
    });
    console.log('进来了', process.argv);

    this.previewServer = server;
    // server
    this.previewServer.start();

    this.initHooks(compiler, this);
  }

  initHooks(compiler, context) {
    // 开发模式下（dev）
    compiler.hooks.watchRun.tapAsync(
      'Svg2IconfontWebpack',
      transactionHOF(watchRun, this.pluginOptions, context),
    );

    // build
    compiler.hooks.run.tapAsync('Svg2IconfontWebpack', transactionHOF(run, this.pluginOptions, context));
    
    // compilation => html-webpck-plugin
    compiler.hooks.compilation.tap(
      'Svg2IconfontWebpack',
      transactionHOF(compilation, this.pluginOptions, context),
    );
    
    // compile 结束
    compiler.hooks.afterCompile.tap(
      'Svg2IconfontWebpack',
      transactionHOF(afterCompile, this.pluginOptions, context),
    );

    compiler.hooks.emit.tap('Svg2IconfontWebpack', transactionHOF(emit, this.pluginOptions, context));
  }
};
