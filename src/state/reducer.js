import { getParserMessage, updateEndpointField } from "../core";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DELAY": {
      return updateEndpointField(state, action, "delay");
    }
    case "SET_PORT": {
      return {
        ...state,
        port: action.payload,
      };
    }

    case "SET_ENDPOINT": {
      return updateEndpointField(state, action, "endpoint");
    }
    case "SET_STATUS": {
      return updateEndpointField(state, action, "status");
    }
    case "SET_MOCK": {
      return {
        ...state,
        endpoints: state.endpoints.map((endpoint, index) => {
          if (index === state.active) {
            return {
              ...endpoint,
              mock: action.payload,
              message: getParserMessage(action.payload),
            };
          }
          return endpoint;
        }),
      };
    }
    case "SET_MESSAGE": {
      return updateEndpointField(state, action, "message");
    }
    case "SET_READY_TO_FORMAT": {
      return { ...state, readyToFormat: action.payload };
    }
    case "SET_ACTIVE": {
      return { ...state, active: action.payload };
    }
    case "FORMAT": {
      return {
        ...state,
        endpoints: action.payload.endpoints,
        readyToFormat: false,
      };
    }

    case "ADD_TAB": {
      return {
        ...state,
        endpoints: [
          ...state.endpoints,
          { delay: 0, message: "", status: 200, mock: "{}", endpoint: "" },
        ],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
