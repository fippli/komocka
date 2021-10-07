import isDefined from "@codewell/is-defined";
const { ipcRenderer } = window.require("electron");
// const fs = require("fs");

// console.log(fs, window, require);

export const allowDrop = (event) => {
  return event.preventDefault();
};

export const drop = (dispatch) => (event) => {
  event.preventDefault();
  const [{ path }] = event.dataTransfer.files;
  console.log(path);
  // const data = fs.readFileSync(path).toString();
  const fileContents = ipcRenderer.sendSync("readfile", path);
  dispatch({ type: "SET_MOCK", payload: fileContents });
};

export const eventAction = (dispatch, type) => (event) =>
  dispatch({ type, payload: event.target.value });

export const getActiveEndpoint = (state) => state.endpoints[state.active];

export const updateEndpointField = (state, action, field) => ({
  ...state,
  endpoints: state.endpoints.map((endpoint, index) => {
    if (index === state.active) {
      return { ...endpoint, [field]: action.payload };
    }
    return endpoint;
  }),
});

export const getParserMessage = (json) => {
  try {
    JSON.parse(json);
    return "Valid JSON";
  } catch (error) {
    return error.message;
  }
};

export const parseMocks = (state) => ({
  ...state,
  endpoints: state.endpoints.map((endpoint) => {
    try {
      return {
        ...endpoint,
        mock: Object.keys(endpoint.mock).reduce((acc, key) => {
          return {
            ...acc,
            [key]: JSON.parse(endpoint.mock[key]),
          };
        }, {}),
      };
    } catch {
      return {
        ...endpoint,
        mock: { message: "invalid json..." },
      };
    }
  }),
});

export const newEndpoint = ({ endpoint = "", type = "json" }) => ({
  method: "get",
  type,
  delay: 0,
  status: 200,
  endpoint,
  mock: {
    get: "{}",
    put: "{}",
    post: "{}",
    delete: "{}",
  },
  message: "",
});

export const formatJson = (json) => {
  if (isDefined(json)) {
    return JSON.stringify(JSON.parse(json), null, 2);
  }
  return "";
};
