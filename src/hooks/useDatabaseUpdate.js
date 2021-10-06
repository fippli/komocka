import { useEffect, useState } from "react";

const { ipcRenderer } = window.require("electron");

const useDatabaseUpdate = (dispatch) => {
  const [isListening, setIsListening] = useState(false);

  const eventHandler = (_, db) => {
    dispatch({ type: "SET_DATABASE", payload: db });
  };

  useEffect(() => {
    if (!isListening) {
      ipcRenderer.on("dbUpdate", eventHandler);
      setIsListening(true);
    }
  }, []);
};

export default useDatabaseUpdate;
