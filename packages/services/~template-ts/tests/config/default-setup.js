/* eslint-disable prefer-rest-params */

// Default setup that runs before every test

// mock lib package
jest.mock('@sls/lib', () => {
  const originalModule = jest.requireActual('@sls/lib');
  // const mockedModule = Object.keys(jest.requireActual('@sls/lib')).reduce((acc, curr) => {
  //   acc[curr] = jest.fn();
  //   return acc;
  // }, {});
  return {
    __esModule: true, // required for esModules

    // keep original module, besides below
    ...originalModule,

    // mock "middleware" utils
    middleware: {
      before: jest.fn().mockImplementation(() => {}),
      after: jest.fn().mockImplementation(() => {}),
      error: jest.fn().mockImplementation(() => {}),
    },

    // mock "lambda" wrapper, removing it's implementation to behave as the original function
    lambda: jest.fn().mockImplementation((func) => async function mockWrapper() { return func.apply(this, arguments); }),
  };
});
