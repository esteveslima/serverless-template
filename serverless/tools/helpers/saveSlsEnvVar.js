// Save(and validate) options as environment variables(SLS_'OPTION') accessible ONLY in build/bundle time(not running time)
module.exports = (options) => {
  Object.keys(options).forEach((option) => {
    if (typeof options[option] !== 'string') throw new Error(`\n\nInvalid Option -> ${option}: ${options[option]}\n\n`);
    process.env[`SLS_${option.toUpperCase()}`] = options[option];
  });
};
