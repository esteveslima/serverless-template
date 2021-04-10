import Core from './core/core';
import Aws from './providers/aws/aws';

// Export main resources objects
export {
  Core,
  Aws,
};

// Export frequently used core resources
const {
  logger, middleware, WarningResponse, ErrorResponse, ErrorObjects,
} = Core;

export {
  logger,
  middleware,
  WarningResponse,
  ErrorResponse,
  ErrorObjects,
};

// Export frequently used aws resources
const { lambda } = Aws;

export {
  lambda,
};
