const responseData = require("../middleware/responseData");
const responseDelay = require("../middleware/responseDelay");
const responseStatus = require("../middleware/responseStatus");

const defaultApi = (app, { endpoint, delay, status, mock }) => {
  Object.keys(mock).forEach((method) => {
    app[method](
      endpoint,
      responseDelay(delay),
      responseStatus(status),
      responseData({ mock: mock[method], status })
    );
  });
};

module.exports = defaultApi;
