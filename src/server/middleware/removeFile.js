const fs = require("fs");
const path = require("path");

const removeFile = (req, res, next) => {
  const { file } = req;
  fs.unlinkSync(path.resolve(__dirname, "../../../", file.path));
  return next();
};

module.exports = removeFile;
