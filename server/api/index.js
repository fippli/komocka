const databaseApi = require("./databaseApi.js");
const defaultApi = require("./default.js");
const filesApi = require("./files.js");

const api = (app, config) => {
  switch (config.type) {
    case "file": {
      return filesApi(app, config);
    }

    case "database": {
      return databaseApi(app, config);
    }

    default: {
      return defaultApi(app, config);
    }
  }
};

module.exports = api;
