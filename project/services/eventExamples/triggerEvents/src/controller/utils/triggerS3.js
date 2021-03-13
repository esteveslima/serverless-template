import { } from '../../../../../../lib/lib';
import { S3, Endpoint } from 'aws-sdk';

const {
  stage, REGION, ACCOUNT_ID, S3_BUCKET,
} = process.env;

export default async () => {
  // Triggering s3 event

  const localConfig = stage !== 'local' ? undefined : {
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER', // This specific key is required when working offline
    secretAccessKey: 'S3RVER',
    endpoint: new Endpoint('https://localhost:4569'),
  };
  const s3Config = {
    apiVersion: '2006-03-01',
    region: REGION,
    ...localConfig,
  };
  const s3 = new S3(s3Config);

  const params = {
    Bucket: stage === 'local' ? 'local-bucket' : S3_BUCKET,
    Key: 'uploads/testS3.txt',
    Body: Buffer.from('abc'),
  };
  const upload = await s3.putObject(params).promise();

  return upload;
};
