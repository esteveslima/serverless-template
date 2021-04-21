import { ErrorObjects } from '@sls/lib';
// TODO: lower the granullarity moving it to per service instead of per function(also increase the default errors)
// Extend default core ErrorObjects for the function
export default {
  ...ErrorObjects,
  SOME_ERROR_OBJECT: { errorCode: 9999, httpCode: 500, message: 'Some new error Object' },
};
