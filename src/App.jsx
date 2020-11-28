import { useReducer } from "react";
import styled from "styled-components";
import DragArea from "./components/DragArea";
import Header from "./components/Header";
import Settings from "./components/Settings";
import TextArea from "./components/TextArea";
import { allowDrop, drop } from "./core";
import useBackendUpdate from "./hooks/useBackendUpdate";
import useJsonFormatter from "./hooks/useJsonFormatter";
import useJsonMessage from "./hooks/useJsonMessage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const initialState = {
  settings: {
    delay: 0,
    port: 8000,
    status: 200,
    endpoint: "/",
    url: "8000",
  },
  mock: "{}",
  message: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DELAY": {
      return {
        ...state,
        settings: { ...state.settings, delay: action.payload },
      };
    }
    case "SET_URL": {
      const [port, ...endpoint] = action.payload.split("/");
      return {
        ...state,
        settings: {
          ...state.settings,
          port,
          endpoint: `/${endpoint.join("/")}` || "",
          url: action.payload,
        },
      };
    }
    case "SET_STATUS": {
      return {
        ...state,
        settings: { ...state.settings, status: action.payload },
      };
    }
    case "SET_MOCK": {
      return { ...state, mock: action.payload };
    }
    case "SET_MESSAGE": {
      return { ...state, message: action.payload };
    }
    case "SET_READY_TO_FORMAT": {
      return { ...state, readyToFormat: action.payload };
    }
    case "FORMAT": {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useJsonMessage(state, dispatch);
  useJsonFormatter(state, dispatch);
  useBackendUpdate(state);

  return (
    <Wrapper onDragOver={allowDrop} onDrop={drop(dispatch)}>
      <DragArea />
      <Header />
      <main>
        <TextArea {...{ state, dispatch }} />
        <Settings {...{ state, dispatch }} />
      </main>
    </Wrapper>
  );
};

export default App;
