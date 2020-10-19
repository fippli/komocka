const responseData = require("./middleware/responseData");
const multer = require("multer");
const removeFile = require("./middleware/removeFile");
const path = require("path");
const uuid = require("uuid/v4");
const fs = require("fs");

const uploadPath = (process.env.NODE_ENV = "development"
  ? path.resolve(__dirname, "../../uploads")
  : path.resolve(__dirname, "../../uploads"));

const fileUploadMiddleware = multer({
  dest: uploadPath,
}).single("file");

const api = (app) => {
  app.get("/", responseData);
  app.post("/", responseData);
  app.put("/", responseData);
  app.delete("/", responseData);

  app.post("/file", fileUploadMiddleware, removeFile, responseData);
  app.post("/file/save", fileUploadMiddleware, (req, res) => {
    const { komocka } = req.state;
    const { filename, path } = req.file;
    res.send({
      date: Date.now(),
      _id: uuid(),
      url: `/file/${filename}`,
      fileData: new Buffer(fs.readFileSync(path)).toString("base64"),
      ...komocka,
    });
  });

  app.get("/file/:id", (req, res) => {
    const filePath = path.resolve(__dirname, `../../uploads/${req.params.id}`);
    res.sendFile(filePath);
  });
};

module.exports = api;
