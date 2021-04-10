/* eslint-disable prefer-rest-params */
import { errorHandler } from '../error/error';

// TODO: change to class
// Function with the purpose of wrapping original function between middlewares executions
function Resolver() {
  this.middlewaresBefore = [];
  this.middlewaresAfter = [];
  // this.functionArgs = undefined;

  // Register middlewares
  this.before = function addMiddlewareBefore(func) {
    if (typeof func === 'function') this.middlewaresBefore.push(func);
  };
  this.after = function addMiddlewareAfter(func) {
    if (typeof func === 'function') this.middlewaresAfter.push(func);
  };

  // Run middlewares(does not modify arguments)
  this.runBefore = async function runMiddlewaresBefore(functionArgs) {
    // this.functionArgs = functionArgs;
    this.middlewaresBefore.forEach(async (func) => {
      const middlewareResult = await func(functionArgs);
    });
  };
  this.runAfter = async function runMiddlewaresAfter(functionResult, functionArgs) {
    this.middlewaresAfter.forEach(async (func) => {
      const middlewareResult = await func(functionResult, functionArgs);
    });
  };

  // Resolve function between middlewares executions
  this.resolve = async function resolver(func, args) {
    const result = await (async () => {
      try {
        this.runBefore(args);
        const functionResult = await func.apply(this, args);
        this.runAfter(functionResult, args);

        return functionResult;
      } catch (err) {
        const errorMessage = errorHandler(err);
        return errorMessage;
      }
    })();

    return result;
  };
}

const resolver = new Resolver();
const middleware = {
  before: resolver.before.bind(resolver),
  after: resolver.after.bind(resolver),
};

export {
  resolver,
  middleware,
};
