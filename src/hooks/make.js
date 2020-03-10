const { error, success } = require('../log');
const cssBuilder = require('../css/builder');
const { isProd } = require('../env');

const fontOuput = function (compilation, outputOptions) {
  const cacheBuffers = this.cacheBuffers;
  const { fileName } = outputOptions;

  const { publicPath } = this.options.output;

  Object.keys(cacheBuffers).forEach(suffix => {
    compilation.assets[`${isProd ? publicPath : ''}css/${fileName}.${suffix}`] = {
      source: () => {
        return cacheBuffers[suffix];
      },
      size: () => {
        return Buffer.byteLength(cacheBuffers[suffix]);
      },
    };
  });

  return Object.keys(cacheBuffers).join(',');
};

const fontCssOutput = function (compilation, cssResult, outputOptions) {
  // get CSS file content
  const fileContent = cssResult.css;

  const { publicPath } = this.options.output;

  const oppositeFilePath = `${isProd ? publicPath : ''}css/${outputOptions.cssFileName}.css`;

  compilation.assets[oppositeFilePath] = {
    source: () => {
      return fileContent;
    },
    size: () => {
      return Buffer.byteLength(fileContent, 'utf-8');
    },
  };

  return oppositeFilePath;
}

module.exports = options => {
  return function(compilation) {
    const context = this;
    try {
      const { output } = options;
      compilation.hooks.additionalAssets.tapAsync('Svg2IconfontWebpack', cb => {

        // output font libs
        const cacheBuffersMsg = fontOuput.call(context, compilation, output);
        success(`${cacheBuffersMsg} built successfully!`);

        const cssResult = cssBuilder.call(context, options);

        // output css files
        const fontCssMsg = fontCssOutput.call(context, compilation, cssResult, output);
        success(`${fontCssMsg} built successfully!`);
        
        cb();
      });
    } catch (e) {
      error(e);
    }
  };
};
