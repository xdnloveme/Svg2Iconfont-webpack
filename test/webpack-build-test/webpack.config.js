const path = require('path');
const Svg2IconfontWebpack = require('../../index');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = current => {
  return path.resolve(__dirname, current);
};

module.exports = {
  mode: 'production',
  entry: './index',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
  },
  target: 'node',
  plugins: [
    new HtmlWebpackPlugin(),
    new Svg2IconfontWebpack({
      assetsPath: resolve('./assets'),
    }),
  ],
};
