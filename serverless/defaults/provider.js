/* eslint-disable no-template-curly-in-string */

const provider = {
  aws: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'local', // "${opt:stage, 'local'}",
    region: 'us-east-1', // "${opt:region, 'us-east-1'}",
    // apiName: 'serverless-template-${self:service}',
    memorySize: 128,
    timeout: 30,
    logRetentionInDays: 7,
    // usagePlan:
    //  - free:
    //  - paid:
    // apiKeys:
    //  - free:
    //  - paid:
    // deploymentBucket:
    environment: {
      REGION: '${self:provider.region}',
      STAGE: '${self:provider.stage}',
      ACCOUNT_ID: '{ "Ref" : "AWS::AccountId" }',
      // API_ID: { "Ref" : "ApiGatewayRestApi" }       # throws and error if there is no "http" event in the service(rather use it per function)
      // HTTP_API_ID: { "Ref" : "HttpApi" }            # throws and error if there is no "httpApi" event in the service(rather use it per function)

    },
    lambdaHashingVersion: '20201221', // DEPRECATION_RESOLUTION - new lambda hashing algoritm upcoming in next version
    apiGateway: { shouldStartNameWithService: true }, // DEPRECATION_RESOLUTION - new naming pattern upcomming in next version
  },

};

module.exports.getProvider = (cloud = 'aws', stage, { region }) => {
  if (cloud === 'aws') {
    if (stage) provider.stage = stage;
    if (region) provider.region = region;
  }

  return provider[cloud];
};
