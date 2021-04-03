// Wrapping function to lambda responses, which requires body to be strigified
// DEPRECATED
/* export const response = (statusCode, headers = undefined, data = undefined) => ({
  statusCode,
  headers,
  body: typeof data === 'string' ? data : JSON.stringify(data),
}); */

// Parse results from functions(accepts statusCode and headers in result object) to lambda responses
export const parseResponse = (functionResult) => {
  try {
    if (typeof functionResult === 'object') {
      return {
        statusCode: functionResult.statusCode || 200,
        headers: functionResult.headers || undefined,
        body: ((obj) => {
          const resultObj = JSON.parse(JSON.stringify(obj));
          delete resultObj.statusCode;
          delete resultObj.headers;
          return Object.keys(resultObj).length > 0 ? JSON.stringify(resultObj) : undefined;
        })(functionResult),
      };
    }

    return {
      statusCode: 200,
      body: functionResult,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error while parsing response',
    };
  }
};
