/* eslint-disable prefer-rest-params */

// Default setup that runs before every test

// // mock lib package
// jest.mock('@sls/lib', () => {
//   const originalModule = jest.requireActual('@sls/lib');

//   return {
//     __esModule: true, // required for esModules

//     // keep original module, besides below
//     ...originalModule,

//     // mock "lambda" wrapper, removing it's implementation to behave as the original function
//     lambda: jest.fn().mockImplementation((func) => async function mockWrapper() { return func.apply(this, arguments); }),
//   };
// });
