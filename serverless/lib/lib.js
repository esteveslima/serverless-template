import Core from './core/core';
import Lambda from './lambda/lambda';

// Export resources objects
export {
  Core,
  Lambda,
};

// Export frequently used lambda resources
const { lambda } = Lambda;

export {
  lambda,
};

// Export frequently used core resources
const { middleware } = Core;

export {
  middleware,
};
