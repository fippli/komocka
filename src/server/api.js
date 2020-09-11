const responseData = require("./middleware/responseData");
const multer = require("multer");
const removeFile = require("./middleware/removeFile");

const fileUploadMiddleware = multer({ dest: "uploads/" }).single("file");

const api = (app) => {
  app.get("/", responseData);
  app.post("/", responseData);
  app.put("/", responseData);
  app.delete("/", responseData);

  app.post("/file", fileUploadMiddleware, removeFile, responseData);
};

module.exports = api;
