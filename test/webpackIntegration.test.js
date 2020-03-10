const webpack = require('webpack');
const webpackConfig = require('./webpack-build-test/webpack.config');

describe('Webpack Integration Tests', () => {
  test('build', done => {
    webpack(webpackConfig, (err, status) => {
      if (err) {
        return done(err);
      }
      done(status);
    });
  });
});
