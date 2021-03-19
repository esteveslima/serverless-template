// default IAM resource
module.exports = {
  defaultRole: {
    Type: 'AWS::IAM::Role',
    Properties: {
      RoleName: 'defaultRole',
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: [
                'lambda.amazonaws.com',
              ],
            },
            Action: 'sts:AssumeRole',
          },
        ],
      },
      Policies: [
        {
          PolicyName: 'myPolicyName',
          PolicyDocument: {
            Statement: [
              {
                Effect: 'Allow',
                Action: [
                  'logs:CreateLogGroup',
                  'logs:CreateLogStream',
                  'logs:PutLogEvents',
                ],
                Resource: [
                  {
                    'Fn::Join': [
                      ':',
                      [
                        'arn:aws:logs',
                        {
                          Ref: 'AWS::Region',
                        },
                        {
                          Ref: 'AWS::AccountId',
                        },
                        'log-group:/aws/lambda/*:*:*',
                      ],
                    ],
                  },
                ],
              },
              // Add here new permissions...
            ],
          },
        },
      ],
    },
  },
};
