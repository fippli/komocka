const cors = require("cors");
const bodyParser = require("body-parser");
const responseDelay = require("./responseDelay");
const responseStatus = require("./responseStatus");
const stateMiddleware = require("./stateMiddleware");

module.exports = (app, getState) => {
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(stateMiddleware(getState));
  app.use(responseDelay);
  app.use(responseStatus);
};
