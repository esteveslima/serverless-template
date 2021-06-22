import type { APIGatewayProxyResult } from 'aws-lambda';
import logger from '../../../../core/logger/logger';

// Parse results from functions(accepts statusCode and headers in result object) to lambda responses
export default (functionResult : any) : APIGatewayProxyResult => {
  try {
    if (functionResult && typeof functionResult === 'object') {
      const {
        statusCode, headers, isBase64Encoded, ...body
      } = functionResult;

      return {
        statusCode: statusCode || 200,
        headers,
        isBase64Encoded: isBase64Encoded || false,
        body: JSON.stringify(body),
      };
    }

    return { statusCode: 200, body: functionResult?.toString() };
  } catch (err : unknown) {
    logger.error(err);
    return { statusCode: 500, body: 'Error on parse response' };
  }
};
