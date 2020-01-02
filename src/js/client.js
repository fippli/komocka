const { ipcRenderer } = require('electron');
const messageElement = document.getElementById('json-message');
const mockElement = document.getElementById('mock-wrapper');
const endpointElement = document.getElementById('endpoint-wrapper');
const settingsElement = document.getElementById('settings-wrapper');

let settings = {
  delay: 0,
};

let apiSettings = {
  port: 9001,
};

const updateMock = (event) => {
  const { value } = event.target;
  try {
    JSON.parse(value);
    POST((data) => {
      console.log(data);
      messageElement.innerText = 'Valid JSON. Mock updated.';
    }, 'mock', value, apiSettings);
  } catch (error) {
    messageElement.innerText = error.message;
  }
};

const updateSettings = (newSettings) => {
  try {
    POST((data) => {
      console.log(data);
      messageElement.innerText = 'Valid JSON. Mock updated.';
    }, 'settings', JSON.stringify(newSettings), apiSettings);
  } catch (error) {
    messageElement.innerText = error.message;
  }
};

const setView = (view) => {
  switch (view) {
    case 'code': {
      mockElement.className = 'show';
      endpointElement.className = 'hide';
      settingsElement.className = 'hide';
      break;
    }
    case 'endpoints': {
      mockElement.className = 'hide';
      endpointElement.className = 'show';
      settingsElement.className = 'hide';
      break;
    }
    case 'settings': {
      mockElement.className = 'hide';
      endpointElement.className = 'hide';
      settingsElement.className = 'show';
      break;
    }
  }
};

const setDelay = (event) => {
  const { value } = event.target;
  const newSettings = {
    ...settings,
    delay: parseInt(value),
  };
  console.log(newSettings);
  updateSettings(newSettings);
};

const setServerPort = (event) => {
  try {
    const newPort = parseInt(event.target.value);
    apiSettings.port = newPort;
    ipcRenderer.send('restartServer', newPort);
  } catch (error) {
    console.log(error);
  }
};