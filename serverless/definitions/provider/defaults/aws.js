/* eslint-disable no-template-curly-in-string */

// Provider section of serverless with default configurations for functions(many can also be defined at function level, check https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/)
module.exports = {
  // Main config
  name: 'aws',
  runtime: 'nodejs12.x',
  profile: 'aws-cloud', // profile with production keys in the credentials file
  stage: "${opt:stage, 'local'}",
  region: "${opt:region, 'us-east-1'}",
  // deploymentBucket: {},

  // Logs config
  logs: true,
  logRetentionInDays: 7,
  // onError: arn:aws:sns:...,

  // Performance related config
  memorySize: 128,
  timeout: 10, // max -> 900seg(30seg for API Gateway)
  // reservedConcurrency: ,
  // provisionedConcurrency: ,
  // endpointType: ,

  // Specific configs
  apiGateway: {
    // SEE OTHERS FEATURES
    // usagePlan:
    //  - free:
    //      quota:
    //      throttle
    //  - paid:
    //      quota:
    //      throttle
    // apiKeySourceType: ,
    // apiKeys:
    //  - free:
    //  - paid:
    // restApiId: ,
    // restApiRootResourceId: ,
    // websocketApiId: ,
    // binaryMediaTypes: [ // TODO: TEST DEPRECATION OF PLUGIN apigtwbinary and verify if */* is a jokerconfig or this must be configurated
    //   '*/*',
    // ],
    shouldStartNameWithService: true, // DEPRECATION_RESOLUTION - new naming pattern upcomming in next version
  },
  // httpApi: {},
  // vpc: {}, // TODO: rate-limiting, firewall and others security configurations
  // TODO: see possibility of lambda layer for common functions from @sls/lib(propagating modifications in all lambdas on deploy)

  environment: { // TODO: LOOK AT #Referencing Serverless Core Variables #Reference CloudFormation Outputs #Reference Variables using the SSM Parameter Store #Reference Variables using AWS Secrets Manager #Pseudo Parameters Reference
    REGION: '${self:provider.region}',
    STAGE: '${self:provider.stage}',
    // ACCOUNT_ID: '{ "Ref" : "AWS::AccountId" }', // refs not working with .js variables, resolving as string instead
    // API_ID: { "Ref" : "ApiGatewayRestApi" }       # throws and error if there is no "http" event in the service(rather use it per function)
    // HTTP_API_ID: { "Ref" : "HttpApi" }            # throws and error if there is no "httpApi" event in the service(rather use it per function)

  },

  lambdaHashingVersion: '20201221', // DEPRECATION_RESOLUTION - new lambda hashing algoritm upcoming in next version
};
