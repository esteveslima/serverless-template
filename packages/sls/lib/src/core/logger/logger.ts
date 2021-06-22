/* eslint-disable no-console */
const { IS_OFFLINE } = process.env;

export default {
  log: (...data : any) => {
    // if (IS_OFFLINE) return;
    console.log(...data);
  },
  info: (...data : any) => {
    // if (IS_OFFLINE) return;
    console.info(...data);
  },
  warn: (...data : any) => {
    // if (IS_OFFLINE) return;
    console.warn(...data);
  },
  error: (...data : any) => {
    // if (IS_OFFLINE) return;
    console.error(...data);
  },
};
