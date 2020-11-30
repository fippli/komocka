const responseData = require("../middleware/responseData");

const defaultApi = (app, { endpoint }) => {
  app.get(endpoint, responseData);
  app.post(endpoint, responseData);
  app.put(endpoint, responseData);
  app.delete(endpoint, responseData);
};

module.exports = defaultApi;
