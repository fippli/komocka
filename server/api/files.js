const responseData = require("../middleware/responseData");
const multer = require("multer");
const removeFile = require("../middleware/removeFile");
const path = require("path");
const uuid = require("uuid/v4");
const fs = require("fs");

const uploadPath = (process.env.NODE_ENV = "development"
  ? path.resolve(__dirname, "../../uploads")
  : path.resolve(__dirname, "../../uploads"));

const fileUploadMiddleware = multer({
  dest: uploadPath,
}).single("file");

const filesApi = (app, { port }) => {
  app.get("/files", (_, res) => {
    const files = fs.readdirSync(path.resolve(__dirname, "../../uploads"));
    res.send(
      files.map((file) => ({
        url: `http://localhost:${port}/files/${file}`,
        endpoint: `/files/${file}`,
        _id: file,
      }))
    );
  });

  app.get("/files/:id", (req, res) => {
    const filePath = path.resolve(__dirname, `../../uploads/${req.params.id}`);
    res.sendFile(filePath);
  });

  app.post("/files", fileUploadMiddleware, (req, res) => {
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

  app.post("/files/dontsave", fileUploadMiddleware, removeFile, responseData);

  app.delete("/files/:id", (req, res) => {
    fs.unlinkSync(path.resolve(__dirname, `../../uploads/${req.params.id}`));
    res.status(204).send();
  });

  app.delete("/files", (_, res) => {
    const files = fs.readdirSync(path.resolve(__dirname, "../../uploads"));
    files.forEach((file) => {
      fs.unlinkSync(path.resolve(__dirname, `../../uploads/${file}`));
    });
    res.status(204).send();
  });
};

module.exports = filesApi;
