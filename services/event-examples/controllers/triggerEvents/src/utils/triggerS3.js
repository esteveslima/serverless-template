import { s3 } from '@sls/lib';

const { S3_BUCKET } = process.env;

export default async () => {
  // Triggering s3 event

  const params = {
    Bucket: S3_BUCKET,
    Key: 'uploads/testS3.txt',
    // ContentType: '',
    Body: Buffer.from('abc'),
  };

  const upload = await s3.putObject(params).promise();

  return upload;
};
