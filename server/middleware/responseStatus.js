const getRandomStatus = () => {
  const statuses = [200, 200, 500, 200, 500, 200];
  const randInt = Math.floor(Math.random() * Math.floor(statuses.length));
  return statuses[randInt];
};

const responseStatus = (status) => (req, res, next) => {
  if (status === "random") {
    res.status(getRandomStatus());
  } else {
    res.status(status);
  }

  return next();
};

module.exports = responseStatus;
