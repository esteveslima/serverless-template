// TODO: change to babelrc and test if webpack works without babel inline config
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
          node: '12',
        },
      },
    ],
  ],
  // plugins: [
  //   '@babel/plugin-transform-runtime',
  // ],
};
