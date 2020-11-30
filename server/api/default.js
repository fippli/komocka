const responseData = require("../middleware/responseData");
const responseDelay = require("../middleware/responseDelay");
const responseStatus = require("../middleware/responseStatus");

const defaultApi = (app, { endpoint, delay, status, mock }) => {
  app.get(
    endpoint,
    responseDelay(delay),
    responseStatus(status),
    responseData(mock)
  );
  app.post(
    endpoint,
    responseDelay(delay),
    responseStatus(status),
    responseData(mock)
  );
  app.put(
    endpoint,
    responseDelay(delay),
    responseStatus(status),
    responseData(mock)
  );
  app.delete(
    endpoint,
    responseDelay(delay),
    responseStatus(status),
    responseData(mock)
  );
};

module.exports = defaultApi;
