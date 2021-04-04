/* eslint-disable prefer-rest-params */
// TODO: change to class
// Function with the purpose of wrapping original function between middlewares executions
function Resolver() {
  this.middlewaresBefore = [];
  this.middlewaresAfter = [];
  this.functionArgs = undefined;

  this.before = function addMiddlewareBefore(func) {
    if (typeof func === 'function') this.middlewaresBefore.push(func);
  };
  this.after = function addMiddlewareAfter(func) {
    if (typeof func === 'function') this.middlewaresAfter.push(func);
  };

  this.runBefore = async function runMiddlewaresBefore(functionArgs) {
    this.functionArgs = functionArgs;
    this.middlewaresBefore.forEach(async (func) => {
      const middlewareResult = await func(functionArgs);
    });
  };
  this.runAfter = async function runMiddlewaresAfter(functionResult) {
    this.middlewaresAfter.forEach(async (func) => {
      const middlewareResult = await func(functionResult, this.functionArgs);
    });
  };
  this.resolve = async function resolver(func, args) {
    this.runBefore(args);

    const functionResult = await func.apply(this, args);

    this.runAfter(functionResult);

    return functionResult;
  };
}

// Resolver.prototype.before = function addMiddlewareBefore(func) {
//   this.middlewaresBefore.push(func);
// };
// Resolver.prototype.after = function addMiddlewareAfter(func) {
//   this.middlewaresAfter.push(func);
// };
// Resolver.prototype.resolve = async function resolver(func, args) {
//   this.runBefore(args);

//   const functionResult = await func.apply(this, args);

//   this.runAfter(functionResult);

//   return functionResult;
// };

const resolver = new Resolver();
const middleware = {
  before: resolver.before.bind(resolver),
  after: resolver.after.bind(resolver),
};

export {
  resolver,
  middleware,
};
