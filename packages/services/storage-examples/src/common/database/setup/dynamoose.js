import * as dynamoose from 'dynamoose';

// Configure local dynamodb in offline server
export default () => {
  const { IS_OFFLINE } = process.env;
  if (IS_OFFLINE) dynamoose.aws.ddb.local('http://dynamodb-container:8000'); // side effects(?)
};
