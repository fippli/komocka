const { ipcMain } = require("electron");
const express = require("express");
const middleware = require("./middleware");
const api = require("./api");

let state = {
  komocka: {},
  delay: 1000,
  status: 200,
  port: 8080,
  endpoint: "/",
};

const getState = () => ({ ...state });

// [!] Mutating
const updateState = (key) => (_, data) => {
  state[key] = data;
};

let server; // Remember the running process for later

const restartServer = (getState) => (_) => {
  if (server) server.close();
  const { port, endpoint } = getState();
  const app = express();
  middleware(app, getState);
  api(app, endpoint);
  server = app.listen(port, () => {
    console.log(`Find your Komocka at http://localhost:${port}${endpoint}`);
  });
};

ipcMain.on("mock", updateState("komocka"));
ipcMain.on("delay", updateState("delay"));
ipcMain.on("status", updateState("status"));
ipcMain.on("port", updateState("port"));
ipcMain.on("endpoint", updateState("endpoint"));
ipcMain.on("restart", restartServer(getState));

module.exports = restartServer(getState);
