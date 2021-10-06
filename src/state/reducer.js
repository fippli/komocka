import { getParserMessage, newEndpoint, updateEndpointField } from "../core";

const actionSwitch = (state, action) => {
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
              mock: {
                ...endpoint.mock,
                [endpoint.method]: action.payload,
              },
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

    case "SET_METHOD": {
      return updateEndpointField(state, action, "method");
    }

    case "SET_TYPE": {
      return updateEndpointField(state, action, "type");
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
        active: state.endpoints.length,
        endpoints: [
          ...state.endpoints,
          newEndpoint({ endpoint: "", type: "json" }),
        ],
      };
    }
    case "SET_DATABASE": {
      return {
        ...state,
        database: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const reducer = (state, action) => {
  const nextState = actionSwitch(state, action);
  console.log(nextState);
  return nextState;
};

export default reducer;
