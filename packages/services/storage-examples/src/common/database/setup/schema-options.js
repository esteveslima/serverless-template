const { IS_OFFLINE } = process.env;

// DO NOT USE ODM TO MODIFY TABLE(INFRASTRUCTURE) SETTINGS, DISABEL EVERYTHING
// The infrastructure should be done apart from running code(for this example it is being created using CloudFormation)
export default {
  create: false,
  update: false,
  waitForActive: {
    enabled: false,
  },
};
