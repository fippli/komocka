const { ipcMain } = require("electron");
const express = require("express");
const middleware = require("./middleware");
const api = require("./api/index.js");
const closeServer = require("./utils/closeServer");
const fs = require("fs");

let server; // Remember the running process for later

const restartServer = (_, state) => {
  try {
    closeServer(server);
    const { port, endpoints } = state;
    const app = express();
    middleware(app);
    endpoints.forEach((endpointConfig) => {
      api(app, { port, ...endpointConfig });
    });

    server = app.listen(port);
  } catch (error) {
    console.error(error);
  }
};

ipcMain.on("restart", restartServer);
ipcMain.on("readfile", (event, path) => {
  console.log(path);
  const data = fs.readFileSync(path).toString();
  console.log(data);
  event.returnValue = data;
});

module.exports = restartServer;
