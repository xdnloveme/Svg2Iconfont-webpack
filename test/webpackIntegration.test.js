const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const Svg2IconfontWebpack = require('..');

jest.setTimeout(30000);

const resolve = current => {
  return path.resolve(__dirname, current);
};

const webpackConfig = require(resolve('./webpack-build-test/webpack.config'));

describe('Webpack Integration Tests', () => {
  it('build', done => {
    const callback = (err, stats) => {
      try {
        console.log('哈哈', stats.hasErrors());
        if (err || stats.hasErrors()) {
          return done(err || stats.toString());
        }
        const webpackOutFilename = webpackConfig.output.filename;
        const expectedDistDir = ['css', 'index.html', webpackOutFilename];
        const distDir = fs.readdirSync(resolve('./webpack-build-test/dist'));
        const distFontFiles = fs.readdirSync(resolve('./webpack-build-test/dist/css'));
        const pluginsFilter = webpackConfig.plugins.filter(each => each instanceof Svg2IconfontWebpack);
  
        // distDir equal expectedDistDir
        expect(distDir).toEqual(expectedDistDir);
  
        // Svg2IconfontWebpackPlugins length > 0
        expect(pluginsFilter.length > 0).toBeTruthy();
  
        const iconfontSuffix = ['eot', 'svg', 'ttf', 'woff', 'woff2'];
        const Svg2IconfontWebpackPlugins = pluginsFilter[0];
        // iterator for each
        const iterator = iconfontSuffix.entries();
        let each = iterator.next();
        while (!each.done) {
          const fileName = Svg2IconfontWebpackPlugins.pluginOptions.output.fileName;
          // check each iconfont output
          expect(distFontFiles.includes(`${fileName}.${each.value[1]}`)).toBeTruthy();
          each = iterator.next();
        }
        const cssFileName = Svg2IconfontWebpackPlugins.pluginOptions.output.cssFileName;
        expect(distFontFiles.includes(`${cssFileName}.css`)).toBeTruthy();
  
        done();
      } catch (e) {
        done(e);
      }
    }    

    webpack(webpackConfig, callback);
  });
});
