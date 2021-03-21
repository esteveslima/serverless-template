import { } from '../../../../../../lib/lib';
import { S3, Endpoint } from 'aws-sdk';

const {
  IS_OFFLINE, REGION, S3_BUCKET,
} = process.env;

export default async () => {
  // Triggering s3 event

  const s3Config = {
    apiVersion: '2006-03-01',
    region: REGION,
  };
  const params = {
    Bucket: S3_BUCKET,
    Key: 'uploads/testS3.txt',
    // ContentType: '',
    Body: Buffer.from('abc'),
  };

  if (IS_OFFLINE) { // for local testing purposes
    s3Config.s3ForcePathStyle = true;
    s3Config.accessKeyId = 'S3RVER'; // This specific key is required when working offline
    s3Config.secretAccessKey = 'S3RVER';
    s3Config.endpoint = new Endpoint('https://localhost:4569');
  }

  const s3 = new S3(s3Config);
  const upload = await s3.putObject(params).promise();

  return upload;
};
