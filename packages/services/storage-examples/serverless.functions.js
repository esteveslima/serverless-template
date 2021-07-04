/* eslint-disable no-template-curly-in-string */
// Functions configuration resolved as .js variable with extra custom logic

const { utils: { functions } } = require('@sls/definitions');

module.exports = async ({ options, resolveConfigurationProperty, resolveVariable }) => {
  const stage = await resolveVariable('self:provider.stage');
  const isLocal = stage === 'local'; // custom (js) condition to enable/disable definitions based on stage

  // CloudFormation reference for created resource(at serverless.resources.js)
  let DDB_TABLE_NAME = { Ref: 'musicsDDBTable' };
  let DDB_ARN = { 'Fn::GetAtt': ['musicsDDBTable', 'Arn'] };

  // Mock reference for 'local' development stage, for usage with plugins(must match the right format and names)
  if (isLocal) {
    DDB_TABLE_NAME = '${self:resources.Resources.musicsDDBTable.Properties.TableName}';
    DDB_ARN = 'arn:aws:dynamodb:ddblocal:000000000000:table/${self:resources.Resources.musicsDDBTable.Properties.TableName}';
  }

  return functions({
    insertDataDynamoDB: {
      handler: './src/functions/insertDataDynamoDB/handler.default',
      timeout: 30,
      events: [
        {
          http: {
            method: 'POST',
            path: '/insertDataDynamoDB',
          },
        },
      ],
      environment: {
        DDB_TABLE_NAME,
      },
      // extra permissions for function(References: https://gist.github.com/slmingol/d1eff788d1417d7ac160eda57131c7d0)
      iamRoleStatements: [
        {
          Effect: 'Allow',
          // It's not recommended to use wildcards('*') for permissions, listing one by one
          Action: [
            'dynamodb:PutItem',
            'dynamodb:GetItem',
            'dynamodb:UpdateItem',
            'dynamodb:Query',
          ],
          Resource: DDB_ARN,
        },
      ],
    },
  });
};
