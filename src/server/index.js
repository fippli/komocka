const { ipcMain } = require("electron");
const express = require("express");
const middleware = require("./middleware");
const api = require("./api");

// Internal dummy state
let state = {
  komocka: {},
  delay: 1000,
  status: 200,
  port: 8080,
};

const getState = () => ({ ...state });

const app = express();

middleware(app, getState);

api(app);

// [!] Mutating
const updateState = (key) => (_, data) => {
  state[key] = data;
};

let server; // Remember the process running for later

const restartServer = (app, getState) => (_) => {
  if (server) server.close();
  const { port } = getState();
  server = app.listen(port, () => {
    console.log(`Find your Komocka at http://localhost:${port}`);
  });
};

ipcMain.on("mock", updateState("komocka"));
ipcMain.on("delay", updateState("delay"));
ipcMain.on("status", updateState("status"));
ipcMain.on("port", updateState("port"));
ipcMain.on("restart", restartServer(app, getState));

module.exports = restartServer(app, getState);
