import { parseMocks } from "../core";

const { ipcRenderer } = window.require("electron");
const { useEffect } = require("react");

const useBackendUpdate = (state) => {
  useEffect(() => {
    ipcRenderer.send("restart", parseMocks(state));
  }, [state]);
};

export default useBackendUpdate;
