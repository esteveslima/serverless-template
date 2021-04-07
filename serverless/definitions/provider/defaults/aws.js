/* eslint-disable no-template-curly-in-string */
module.exports = {
  name: 'aws',
  runtime: 'nodejs12.x',
  profile: 'aws-cloud', // profile with production keys in credentials file
  stage: "${opt:stage, 'local'}",
  region: "${opt:region, 'us-east-1'}",
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
  apiGateway: { // TEST DEPRECATION OF PLUGIN
    // SEE OTHERS FEATURES
    // binaryMediaTypes: [
    //   '*/*',
    // ],
    shouldStartNameWithService: true, // DEPRECATION_RESOLUTION - new naming pattern upcomming in next version
  },
  environment: { // TODO: LOOK AT #Referencing Serverless Core Variables #Reference CloudFormation Outputs #Reference Variables using the SSM Parameter Store #Reference Variables using AWS Secrets Manager #Pseudo Parameters Reference
    REGION: '${self:provider.region}',
    STAGE: '${self:provider.stage}',
    // ACCOUNT_ID: '{ "Ref" : "AWS::AccountId" }', // refs not working with .js variables, resolving as string instead
    // API_ID: { "Ref" : "ApiGatewayRestApi" }       # throws and error if there is no "http" event in the service(rather use it per function)
    // HTTP_API_ID: { "Ref" : "HttpApi" }            # throws and error if there is no "httpApi" event in the service(rather use it per function)

  },

  lambdaHashingVersion: '20201221', // DEPRECATION_RESOLUTION - new lambda hashing algoritm upcoming in next version
};
