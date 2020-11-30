const getRandomDelay = (max) =>
  Math.floor(Math.random() * Math.floor(max)) * 1000;

const responseDelay = (delay) => (req, res, next) => {
  if (delay === "random") {
    setTimeout(next, getRandomDelay(5));
  } else {
    setTimeout(next, delay);
  }
};

module.exports = responseDelay;
