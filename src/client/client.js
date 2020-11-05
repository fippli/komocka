const { ipcRenderer } = require("electron");
const messageElement = document.getElementById("json-message");
const settingsElement = document.getElementById("settings-wrapper");
const fs = require("fs");

const updateMock = (event) => {
  const { value } = event.target;

  try {
    JSON.parse(value);
    ipcRenderer.send("mock", JSON.parse(value));
    messageElement.innerText = "Valid JSON";
  } catch (error) {
    messageElement.innerText = error.message;
  }
};

const setDelay = (event) => {
  const { value } = event.target;
  ipcRenderer.send("delay", parseInt(value));
};

const setPort = (event) => {
  const { value } = event.target;
  ipcRenderer.send("port", parseInt(value));
};

const setStatus = (event) => {
  const { value } = event.target;
  ipcRenderer.send("status", parseInt(value));
};

let settingsOpen = false;
const toggleSettings = (event) => {
  settingsOpen = !settingsOpen;
  if (settingsOpen) {
    settingsElement.className = "show";
  } else {
    settingsElement.className = "hide";
  }
  console.log(settingsOpen);
};

const restartServer = (event) => {
  ipcRenderer.send("restart");
};

const allowDrop = (event) => {
  return event.preventDefault();
};

const drop = (event) => {
  event.preventDefault();
  const [{ path }] = event.dataTransfer.files;
  const data = fs.readFileSync(path).toString();
  document.getElementById("editor").value = data;
};
