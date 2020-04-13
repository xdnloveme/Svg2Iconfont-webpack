const chalk = require('chalk');
const { error, success } = require('../log');
const fontOutput = require('../core/fontOutput');
const fontCssOutput = require('../core/fontCssOutput');

module.exports = pluginOptions => {
  return function(compilation) {
    const context = this;
    try {
      const { output } = pluginOptions;

      const fontOutputAssets = fontOutput(context, output);

      // output
      fontOutputAssets.forEach(data => {
        const { assetsAbsolutePath, content } = data;
        compilation.assets[assetsAbsolutePath] = {
          source: () => {
            return content;
          },
          size: () => {
            return Buffer.byteLength(content);
          },
        };
      });

      success(chalk.green(`${Object.keys(context.cacheBuffers).join(',')} built successfully!`));

      // output css files
      const { cssFilePath, content } = fontCssOutput(context, output, pluginOptions);

      compilation.assets[cssFilePath] = {
        source: () => {
          return content;
        },
        size: () => {
          return Buffer.byteLength(content, 'utf-8');
        },
      };

      success(chalk.green(`${cssFilePath} built successfully!`));

      if (this.previewServer) {
        this.previewServer.recompile({
          css: {
            cssFilePath,
            content,
          },
          font: fontOutputAssets,
        });
      }
    } catch (e) {
      error(e);
    }
  };
};
