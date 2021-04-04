const levels = ['log', 'info', 'warning', 'error'];
const logger = (data, level = 'log') => {
  if (!levels.includes(level)) throw new Error('Log level not found');
  console[level](data);
};

const log = (...data) => {
  console.log(...data);
};
const info = (...data) => {
  console.info(...data);
};
const warning = (...data) => {
  console.warning(...data);
};
const error = (...data) => {
  console.error(...data);
};

export default {
  log,
  info,
  warning,
  error,
};
