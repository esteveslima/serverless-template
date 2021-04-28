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
    await Promise.all(
      this.middlewaresBefore.map(async (func) => {
        const middlewareResult = await func(functionArgs);
      }),
    );
  };
  this.runAfter = async function runMiddlewaresAfter(functionResult, functionArgs) {
    await Promise.all(
      this.middlewaresAfter.map(async (func) => {
        const middlewareResult = await func(functionResult, functionArgs);
      }),
    );
  };

  // Resolve function between middlewares executions
  this.resolve = async function resolver(func, args) {
    const result = await (async () => {
      try {
        await this.runBefore(args);
        const functionResult = await func.apply(this, args);
        await this.runAfter(functionResult, args);

        return functionResult;
      } catch (err) { // TODO: maybe a simple middleware onError for things like customized logging
        const errorMessage = errorHandler(err);
        return errorMessage;
      }
    })();

    return result;
  };
}

const resolver = new Resolver();
const middleware = { // TODO: refactor to middy to avoid side-effects?
  before: resolver.before.bind(resolver),
  after: resolver.after.bind(resolver),
};

export {
  resolver,
  middleware,
};
