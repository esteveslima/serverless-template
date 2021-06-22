/* eslint-disable prefer-rest-params */
import 'source-map-support/register'; // enable source-map registering at the entry point, to map webpack error logs
import { logger, resolver } from '../../../core/core';
import parseRequest from './utils/parse-request';
import parseResponse from './utils/parse-response';

// Wrapper for lambda functions
export default (func : Function) => async function lambda() {
  const { IS_OFFLINE } = process.env;

  const args = parseRequest(arguments); // Parse lambda requests

  if (!IS_OFFLINE) logger.info(args); // TODO: enhance logs to beautify view on cloudwatch

  const result = await resolver(func, args); // Run function

  if (!IS_OFFLINE) logger.info(result);

  return parseResponse(result); // Parse response for api-gateway
};
