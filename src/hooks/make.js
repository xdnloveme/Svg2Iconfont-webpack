const { error } = require('../log');
const cssBuilder = require('../css/builder');
const { success } = require('../log');

const fontOuput = (cacheBuffers, compilation, outputOptions) => {
  const { fileName } = outputOptions;

  Object.keys(cacheBuffers).forEach(suffix => {
    compilation.assets[`css/${fileName}.${suffix}`] = {
      source: () => {
        return cacheBuffers[suffix];
      },
      size: () => {
        return Buffer.byteLength(cacheBuffers[suffix]);
      },
    };
  });

  success(`${Object.keys(cacheBuffers).join(',')} built successfully!`)
};

module.exports = options => {
  return async function(compilation) {
    const context = this;
    try {
      const { output } = options;
      compilation.hooks.additionalAssets.tapAsync('Svg2IconfontWebpack', async cb => {

        // output font libs
        fontOuput(context.cacheBuffers, compilation, output);

        const cssResult = await cssBuilder.call(context, options);

        // get CSS file content
        const fileContent = cssResult.css;
        compilation.assets[`css/${output.cssFileName}.css`] = {
          source: () => {
            return fileContent;
          },
          size: () => {
            return Buffer.byteLength(fileContent, 'utf-8');
          },
        };

        success(`${output.cssFileName}.css built successfully!`);

        cb();
      });
    } catch (e) {
      error(e);
    }
  };
};
