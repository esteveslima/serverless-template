const iamDefaultRole = require('./iam-default-role');

const { defaultRole } = iamDefaultRole;

module.exports.iamRole = (permissions = []) => {
  const roleConfig = { ...defaultRole };
  roleConfig.Properties.RoleName = `Role-${Date.now()}`;
  roleConfig.Properties.Policies[0].PolicyDocument.Statement.push(...permissions);

  return roleConfig;
};

// TODO: ADD NEW PERMISSIONS TEMPLATES
// module.exports.s3Permission = (bucketName, permission = '*') => {

// }
