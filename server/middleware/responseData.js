const uuid = require("uuid/v4");

const responseData = (mock) => (_, res) => {
  res.send({
    date: Date.now(),
    _id: uuid(),
    ...mock,
  });
};

module.exports = responseData;
