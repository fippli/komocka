const uuid = require("uuid").v4;

const responseData = ({ mock, status }) => (_, res) => {
  return res.status(status).send({
    date: Date.now(),
    _id: uuid(),
    ...mock,
  });
};

module.exports = responseData;
