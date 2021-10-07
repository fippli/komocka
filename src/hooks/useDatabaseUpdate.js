import { useEffect, useState } from "react";

const { ipcRenderer } = window.require("electron");

const useDatabaseUpdate = (dispatch) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const eventHandler = (_, db) => {
      dispatch({ type: "SET_DATABASE", payload: db });
    };

    if (!isListening) {
      ipcRenderer.on("dbUpdate", eventHandler);
      setIsListening(true);
    }
  }, [dispatch, isListening]);
};

export default useDatabaseUpdate;
