import { DynamoDB, Endpoint } from 'aws-sdk';

const { IS_OFFLINE, DDB_ARN_EXAMPLE } = process.env;
const TableName = DDB_ARN_EXAMPLE.split('/').slice(-1)[0];

export default async () => {
  const ddbConfig = {
    region: 'us-east-1',
  };

  if (IS_OFFLINE) { // for local testing purposes
    ddbConfig.region = 'ddblocal';
    ddbConfig.endpoint = new Endpoint('http://dynamodb-container:8000');
    ddbConfig.accessKeyId = 'DEFAULT_ACCESS_KEY'; // needed if you don't have aws credentials at all in env
    ddbConfig.secretAccessKey = 'DEFAULT_SECRET'; // needed if you don't have aws credentials at all in env
  }

  const dynamodb = new DynamoDB(ddbConfig);

  const params = {
    TableName,
    Item: {
      pk: { S: `pk${(new Date(Date.now())).getDay()}` },
      sk: { S: `pk${Date.now()}` },
      randomItem: { S: `${Math.random() * 100}` },
    },
    ReturnConsumedCapacity: 'TOTAL',
  };

  const result = await dynamodb.putItem(params).promise();

  return result;
};
