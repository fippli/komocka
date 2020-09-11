const stateMiddleware = (getState) => (req, res, next) => {
  req.state = getState();
  return next();
};

module.exports = stateMiddleware;
