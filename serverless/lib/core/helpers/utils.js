const {
  REGION, STAGE, ACCOUNT_ID, API_ID, HTTP_API_ID,
} = process.env;

export const serviceDomainHttp = `https://${API_ID}.execute-api.${REGION}.amazonaws.com/${STAGE}`;
export const serviceDomainHttpApi = `https://${HTTP_API_ID}.execute-api.${REGION}.amazonaws.com`;
