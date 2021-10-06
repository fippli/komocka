const uuid = require("uuid").v4;
const responseData = require("../middleware/responseData");
const multer = require("multer");
const removeFile = require("../middleware/removeFile");
const path = require("path");
const fs = require("fs");
const responseDelay = require("../middleware/responseDelay");
const uploadPath = require("../utils/uploadPath");

const fileUploadMiddleware = multer({
  dest: uploadPath,
}).single("file");

const filesApi = (app, { port, mock, delay, status }) => {
  app.get("/files", (_, res) => {
    const files = fs.readdirSync(uploadPath);
    return res.status(status).send(
      files.map((file) => ({
        url: `http://localhost:${port}/files/${file}`,
        endpoint: `/files/${file}`,
        _id: file,
      }))
    );
  });

  app.get("/files/:id", responseDelay(delay), (req, res) => {
    const filePath = path.resolve(uploadPath, req.params.id);
    return res.status(status).sendFile(filePath);
  });

  app.post("/files", fileUploadMiddleware, (req, res) => {
    const { filename, path, originalname } = req.file;
    return res.status(status).send({
      date: Date.now(),
      _id: uuid(),
      url: `/files/${filename}`,
      fileData: Buffer.from(fs.readFileSync(path)).toString("base64"),
      filename: originalname,
      ...mock,
    });
  });

  app.post(
    "/files/dontsave",
    fileUploadMiddleware,
    removeFile,
    responseData({ mock: mock["post"], status })
  );

  app.delete("/files/:id", (req, res) => {
    fs.unlinkSync(path.resolve(uploadPath, req.params.id));
    return res.status(status).send();
  });

  app.delete("/files", (_, res) => {
    const files = fs.readdirSync(uploadPath);
    files.forEach((file) => {
      fs.unlinkSync(path.resolve(uploadPath, file));
    });
    return res.status(status).send();
  });
};

module.exports = filesApi;
