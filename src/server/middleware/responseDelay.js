const { response } = require("express");

const getRandomDelay = (max) =>
  Math.floor(Math.random() * Math.floor(max)) * 1000;

const responseDelay = (req, res, next) => {
  const { delay } = req.state;

  if (delay === "random") {
    setTimeout(next, getRandomDelay(5));
  } else {
    setTimeout(next, delay);
  }
};

module.exports = responseDelay;
