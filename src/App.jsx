import { useReducer } from "react";
import styled from "styled-components";
import DragArea from "./components/DragArea";
import Header from "./components/Header";
import Input from "./components/Input";
import Label from "./components/Label";
import Row from "./components/Row";
import Settings from "./components/Settings";
import Tab from "./components/Tab";
import TextArea from "./components/TextArea";
import { allowDrop, drop, eventAction } from "./core";
import useBackendUpdate from "./hooks/useBackendUpdate";
import useJsonFormatter from "./hooks/useJsonFormatter";
import ComponentMap from "@codewell/component-map";
import { getActiveEndpoint } from "./core.js";
import reducer from "./state/reducer";
import initialState from "./state/initialState";
import defer from "@codewell/defer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Footer = styled.footer`
  padding: 5px 0;
`;

const EditorWrapper = styled.div`
  flex: 1;
  width: 100%;
  background-color: #222;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const EditorFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 10px;
  color: #fff;
`;

const Message = styled.div`
  font-family: "Source code pro", monospace;
  font-size: 12px;
  display: flex;
  padding: 5px 10px;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
`;

const TabWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  margin-right: 3px;
`;

const TabMenuWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Add = styled.button`
  border: none;
  background-color: #222;
  border-radius: 6px;
  margin: 0 0 3px 3px;
  margin-left: auto;
  font-weight: 900;
  padding: 0px 10px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  :hover {
    background-color: #00ff00;
  }
`;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useJsonFormatter(state, dispatch);
  useBackendUpdate(state);

  return (
    <Wrapper onDragOver={allowDrop} onDrop={drop(dispatch)}>
      <DragArea />
      <Header />
      <Main>
        <TabMenuWrapper>
          <TabWrapper>
            <ComponentMap
              component={Tab}
              data={state.endpoints}
              commonProperties={{
                state,
                dispatch,
              }}
              keyFunction={(_, index) => `tab-${index}`}
            />
          </TabWrapper>
          <Add onClick={defer(dispatch, { type: "ADD_TAB" })}>+</Add>
        </TabMenuWrapper>

        <EditorWrapper>
          <EditorFooter>
            <Row>
              <Label>Delay: </Label>
              <Input
                size={6}
                value={getActiveEndpoint(state).delay}
                onChange={eventAction(dispatch, "SET_DELAY")}
              />
            </Row>
            <Row>
              <Label>Status: </Label>
              <Input
                size={3}
                value={getActiveEndpoint(state).status}
                onChange={eventAction(dispatch, "SET_STATUS")}
              />
            </Row>
          </EditorFooter>
          <TextArea {...{ state, dispatch }} />
          <Message>{getActiveEndpoint(state).message}</Message>
        </EditorWrapper>
      </Main>
      <Footer>
        <Settings {...{ state, dispatch }} />
      </Footer>
    </Wrapper>
  );
};

export default App;
