const path = require('path');
const Svg2IconfontWebpack = require('../..');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = current => {
  return path.resolve(__dirname, current);
};

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  optimization: {
    minimize: false
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
    modules: ["node_modules"]
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  target: 'node',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./index.html')
    }),
    new Svg2IconfontWebpack({
      assetsPath: resolve('./assets'),
    }),
  ],
};
