const fs = require("fs");
const path = require("path");
const responseData = require("./middleware/responseData");
const multer = require("multer");

const fileUploadMiddleware = multer({ dest: "uploads/" }).single("file");

const fileUploadResponse = (effect) => (req, res) => {
  const { file } = req;

  fs.unlinkSync(path.resolve(__dirname, file.path));

  effect(req, res);
};

const api = (app) => {
  app.get("/", responseData);
  app.post("/", responseData);
  app.put("/", responseData);
  app.delete("/", responseData);

  app.post("/file", fileUploadMiddleware, fileUploadResponse);
};

module.exports = api;
