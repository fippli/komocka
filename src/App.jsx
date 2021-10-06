import { useReducer } from "react";
import styled from "styled-components";
import DragArea from "./components/DragArea";
import Header from "./components/Header";
import Settings from "./components/Settings";
import { allowDrop, drop } from "./core";
import useBackendUpdate from "./hooks/useBackendUpdate";
import useJsonFormatter from "./hooks/useJsonFormatter";
import reducer from "./state/reducer";
import initialState from "./state/initialState";
import TabMenu from "./components/TabMenu";
import Editor from "./components/Editor";
import useDatabaseUpdate from "./hooks/useDatabaseUpdate";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 15px 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Footer = styled.footer`
  padding: 5px 15px;
`;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useJsonFormatter(state, dispatch);
  useBackendUpdate(state);
  useDatabaseUpdate(dispatch)

  return (
    <Wrapper onDragOver={allowDrop} onDrop={drop(dispatch)}>
      <DragArea />
      <Header />
      <Main>
        <TabMenu state={state} dispatch={dispatch} />
        <Editor state={state} dispatch={dispatch} />
      </Main>
      <Footer>
        <Settings {...{ state, dispatch }} />
      </Footer>
    </Wrapper>
  );
};

export default App;
