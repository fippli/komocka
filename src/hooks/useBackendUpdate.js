import { parseMocks } from "../core";
import { useEffect } from "react";

const { ipcRenderer } = window.require("electron");

const useBackendUpdate = (state) => {
  useEffect(() => {
    ipcRenderer.send("restart", parseMocks(state));
  }, [state]);
};

export default useBackendUpdate;
