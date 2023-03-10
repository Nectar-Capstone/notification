const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = {
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  ses: {
    from: {
      // replace with actual email address - need to verify the mail first
      default: '"Nectar" <siraprop.jes@gmail.com>',
    },
    // e.g. us-west-2
    region: "ap-northeast-1",
  },
};
