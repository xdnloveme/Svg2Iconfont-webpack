const isDev = process.env.NODE_ENV === 'development';

const isProd = process.env.NODE_ENV === 'production';

const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  isDev,
  isProd,
  isTest,
};
