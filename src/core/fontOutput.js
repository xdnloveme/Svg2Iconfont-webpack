const { isProd } = require('../env');

module.exports = function(context, outputOptions) {
  const options = context.options;

  const cacheBuffers = context.cacheBuffers;
  const { fileName } = outputOptions;

  const { publicPath } = options.output;

  return Object.keys(cacheBuffers).map(suffix => ({
    assetsAbsolutePath: `${isProd ? publicPath : ''}css/${fileName}.${suffix}`,
    content: cacheBuffers[suffix],
  }));
};
