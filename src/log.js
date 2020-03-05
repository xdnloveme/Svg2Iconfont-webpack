const chalk = require('chalk');
const log = console.log;
const logError = console.error;
const logWarn = console.warn;
const { PluginPrefixLog } = require('./constant');

const info = str => {
  return log(`${chalk.hex('#3333').bgBlue(PluginPrefixLog + 'INFO ')} ${str}`);
};

const error = str => {
  return logError(`${chalk.hex('#3333').bgRed(PluginPrefixLog + 'ERROR ')} ${str}`);
};

const warn = str => {
  return logWarn(`${chalk.hex('#3333').bgYellow(PluginPrefixLog + 'WARN ')} ${str}`);
};

const success = str => {
  return logWarn(`${chalk.hex('#3333').bgGreen(PluginPrefixLog + 'SUCCESS ')} ${str}`);
};

module.exports = {
  info,
  error,
  warn,
  success,
};
