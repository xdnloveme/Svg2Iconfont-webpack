const { compilation, watchRun, run, afterCompile, emit } = require('./src/hooks');
const { isDev } = require('./src/env');
const { info, error } = require('./src/log');
const { isPainObject } = require('./src/utils');
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
    this.resolveOptions(options);
  }

  resolveOptions(options) {
    // output fontOptions must be object
    const { output = DEFAULT_OUTPUT, fontOptions = DEFAULT_FONT_OPTIONS } = options;

    // check isPainObject options
    if (!isPainObject(options)) {
      return error('Expected options to be Object');
    }

    const mergeOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

     // check isPainObject fontOptions and output
     if (!isPainObject(fontOptions) || !isPainObject(output)) {
      return error('Expected output and fontOptions to be Object');
    }

    // merge options
    mergeOptions.fontOptions = Object.assign(DEFAULT_FONT_OPTIONS, fontOptions);
    mergeOptions.output = Object.assign(DEFAULT_OUTPUT, output);
    // mount prototype
    this.pluginOptions = mergeOptions;
    this.cacheBuffers = {};
  }

  apply(compiler) {
    const { options } = compiler;

    this.options = options;

    const { preview } = this.pluginOptions;

    if (preview && isDev) {
      this.previewServerInit(this);
    }

    this.initHooks(compiler, this);
  }

  previewServerInit(context) {
    process.env.__PLUGIN_PREVIEW_CSSFILENAME__ = context.pluginOptions.output.cssFileName;

    const server = new Server(context, {
      options: context.options,
    });

    context.previewServer = server;
    // server
    context.previewServer.start();
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
