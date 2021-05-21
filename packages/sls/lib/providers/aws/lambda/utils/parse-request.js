// Parse requests for function
export default (requestArgs) => {
  const args = requestArgs;

  // Try to automatically transform lambda body request from json to object
  try {
    const jsonRequest = JSON.parse(args[0].body);
    args[0].body = jsonRequest;
  } catch (err) {
    // not a json body
  }

  return args;
};
