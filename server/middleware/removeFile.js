const uploadPath = require("../utils/uploadPath");
const fs = require("fs");
const path = require("path");

const removeFile = (req, res, next) => {
  const { file } = req;
  fs.unlinkSync(path.resolve(uploadPath, file.path));
  return next();
};

module.exports = removeFile;
