const uuid = require("uuid/v1");

const responseData = (req, res) => {
  const { komocka } = req.state;
  res.send({
    date: Date.now(),
    _id: uuid(),
    ...komocka,
  });
};

module.exports = responseData;
