const homedir = require("os").homedir();
const path = require("path");

const uploadPath = path.resolve(homedir, ".komocka/uploads");

module.exports = {
  uploadPath,
};
