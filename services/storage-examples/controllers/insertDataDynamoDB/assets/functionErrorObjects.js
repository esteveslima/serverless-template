import { ErrorObjects } from '@sls/lib';
// TODO: replicate this to all services
// Extend default core ErrorObjects for the function
export default {
  ...ErrorObjects,
  SOME_ERROR_OBJECT: { errorCode: 9999, httpCode: 500, message: 'Some new error Object' },
};
