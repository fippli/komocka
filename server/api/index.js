const defaultApi = require("./default.js");
const filesApi = require("./files.js");

const api = (app, config) => {
  defaultApi(app, config);
  filesApi(app, config);
};

module.exports = api;
