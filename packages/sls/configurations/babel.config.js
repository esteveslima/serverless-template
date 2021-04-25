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
