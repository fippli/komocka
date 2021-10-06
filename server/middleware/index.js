const cors = require("cors");
const bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json({ limit: 1000000000 }));
};
