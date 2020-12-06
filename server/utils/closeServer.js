const closeServer = (server) => {
  try {
    server.close();
  } catch {
    // Ignore that this fails completely!
  }
};

module.exports = closeServer;
