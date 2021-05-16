const { IS_OFFLINE } = process.env;

// Beware of options, risk of high costs and/or throttling
export default {
  create: !!IS_OFFLINE, // this option attempt to create the table(recommended to be false on production, with the table created beforehand, activating only on local environment)
  waitForActive: {
    enabled: !!IS_OFFLINE, // wait for the table to be active(recommended to be false on production, activating only on local environment)
    // check: {timeout: 180000, frequency: 1000,}
  },
  // Below properties change table config, do not use it(use aws console to config table)
  // expires: { ttl: 8640000, items: { returnExpired: true } },       // set table ttl
  // throughput: { read: 1, write: 1 }, // throughput: 'ON_DEMAND',   // set table throughput
  // update: ['ttl', 'throughput'],                                   // enable update table capacities to the model config
};
