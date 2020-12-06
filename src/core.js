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
        mock: JSON.parse(endpoint.mock),
      };
    } catch {
      return {
        ...endpoint,
        mock: { message: "invalid json..." },
      };
    }
  }),
});
