const { ipcRenderer } = window.require("electron");
const { useEffect } = require("react");

const useBackendUpdate = ({
  mock,
  settings: { delay, port, status, endpoint },
}) => {
  useEffect(() => {
    try {
      ipcRenderer.send("mock", JSON.parse(mock));
    } catch {}
  }, [mock]);

  useEffect(() => {
    ipcRenderer.send("delay", parseInt(delay));
  }, [delay]);

  useEffect(() => {
    ipcRenderer.send("port", parseInt(port));
    ipcRenderer.send("endpoint", endpoint);
    ipcRenderer.send("restart");
  }, [port, endpoint]);

  useEffect(() => {
    ipcRenderer.send("status", parseInt(status));
  }, [status]);
};

export default useBackendUpdate;
