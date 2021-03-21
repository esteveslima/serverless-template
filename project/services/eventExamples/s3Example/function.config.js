/* eslint-disable no-template-curly-in-string */

// Defining function individually
// Handler path is automatically set (reference from root path, working just like a normal .yml configuration)

const bucket = 'sls-test-s3-bucket';

module.exports.s3Example = {
  timeout: 60,
  events: [
    {
      s3: {
        bucket,
        existing: true, // Prefer to create resources independently from this stack, preventing syncing and data loss problems
        event: 's3:ObjectCreated:*', // event do not trigger if the object is updated(not created)
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
