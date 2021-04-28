/* eslint-disable no-console */
const { IS_OFFLINE } = process.env;

const levels = ['log', 'info', 'warning', 'error'];
const logger = (data, level = 'log') => {
  if (!levels.includes(level)) throw new Error('Log level not found');
  console[level](data);
};

const log = (...data) => {
  // if (IS_OFFLINE) return;
  console.log(...data);
};
const info = (...data) => {
  // if (IS_OFFLINE) return;
  console.info(...data);
};
const warn = (...data) => {
  // if (IS_OFFLINE) return;
  console.warn(...data);
};
const error = (...data) => {
  // if (IS_OFFLINE) return;
  console.error(...data);
};

export default {
  log,
  info,
  warn,
  error,
};
