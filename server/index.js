const { ipcMain } = require("electron");
const express = require("express");
const middleware = require("./middleware");
const api = require("./api/index.js");

let server; // Remember the running process for later

const restartServer = (_, state) => {
  if (server) server.close();
  const { port, endpoints } = state;
  const app = express();
  middleware(app);

  endpoints.forEach((endpointConfig) => {
    api(app, { port, ...endpointConfig });
  });

  server = app.listen(port);
};

ipcMain.on("restart", restartServer);

module.exports = restartServer;
