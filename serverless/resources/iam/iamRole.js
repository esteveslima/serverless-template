const iamDefaultRole = require('./iamDefaultRole');

const { defaultRole } = iamDefaultRole;

module.exports.iamRole = (permissions = []) => {
  const roleConfig = { ...defaultRole };
  roleConfig.Properties.RoleName = `Role-${Date.now()}`;
  roleConfig.Properties.Policies[0].PolicyDocument.Statement.push(...permissions);

  return roleConfig;
};

// TODO: ADD NEW PERMISSION TEMPLATES
// module.exports.s3Permission = (bucketName, permission = '*') => {

// }
