const { isProd } = require('../env');
const cssBuilder = require('../css/builder');

module.exports = function(context, outputOptions, pluginOptions) {
  const options = context.options;

  const cssResult = cssBuilder.call(context, pluginOptions);
  // get CSS file content
  const content = cssResult.css;

  const { publicPath } = options.output;

  const cssFilePath = `${isProd ? publicPath : ''}css/${outputOptions.cssFileName}.css`;

  return {
    cssFilePath,
    content
  }
};
