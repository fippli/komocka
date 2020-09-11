const getRandomStatus = () => {
  const statuses = [200, 200, 500, 200, 500, 200];
  const randInt = Math.floor(Math.random() * Math.floor(statuses.length));
  return statuses[randInt];
};

const responseStatus = (req, res, next) => {
  const { status } = req.state;

  if (status === "random") {
    res.status(getRandomStatus());
  } else {
    res.status(status);
  }

  return next();
};

module.exports = responseStatus;
