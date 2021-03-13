/* eslint-disable no-template-curly-in-string */
// Defining function individually(reference from root path, working just like a normal .yml configuration)
// handler path is automatically set

const { stage } = process.env;

const bucket = stage === 'local' ? 'local-bucket' : 'testS3';

module.exports.s3Example = {
  timeout: 60,
  events: [
    {
      s3: {
        bucket,
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploads/',
          },
          {
            suffix: '.txt',
          },
        ],
      },
    },
  ],
};
