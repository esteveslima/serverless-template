import { s3, ErrorResponse, ErrorObjects } from '@sls/lib'; // TODO: return mocked version of aws-sdk but keep options to change default config on code
import multipartParser from 'lambda-multipart-parser';

const { S3_BUCKET_EXAMPLE } = process.env;

export default async (event) => {
  // Triggering s3 event

  // Parse file sent by 'form-data'
  const { files } = await multipartParser.parse(event);
  const file = files[0];
  if (!file) throw new ErrorResponse(ErrorObjects.WRONG_PARAMETERS);

  // upload file to s3
  const params = {
    Bucket: S3_BUCKET_EXAMPLE,
    Key: `uploads/${file.filename}-${Date.now()}`,
    ContentType: file.contentType,
    Body: file.content,
  };
  const upload = await s3.putObject(params).promise();

  return upload;
};
