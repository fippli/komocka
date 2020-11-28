const fs = window.require("fs");

export const allowDrop = (event) => {
  return event.preventDefault();
};

export const drop = (dispatch) => (event) => {
  event.preventDefault();
  const [{ path }] = event.dataTransfer.files;
  const data = fs.readFileSync(path).toString();
  dispatch({ type: "SET_MOCK", payload: data });
};

/**
 * NEW
 */

export const eventAction = (dispatch, type) => (event) =>
  dispatch({ type, payload: event.target.value });
