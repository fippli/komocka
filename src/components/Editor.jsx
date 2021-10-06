import React from "react";
import styled from "styled-components";
import { eventAction, formatJson, getActiveEndpoint } from "../core";
import Input from "./Input";
import Label from "./Label";
import MethodSelect from "./MethodSelect";
import Row from "./Row";
import TextArea, { StyledTextArea } from "./TextArea";
import TypeSelect from "./TypeSelect";
import RenderGate from "@codewell/render-gate";

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

const Editor = ({ state, dispatch }) => {
  return (
    <EditorWrapper>
      <EditorFooter>
        <RenderGate
          condition={!["database"].includes(getActiveEndpoint(state).type)}
        >
          <Row>
            <Label>Method: </Label>
            <MethodSelect state={state} dispatch={dispatch} />
          </Row>
        </RenderGate>
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
        <Row>
          <Label>Type: </Label>
          <TypeSelect state={state} dispatch={dispatch} />
        </Row>
      </EditorFooter>
      <RenderGate condition={getActiveEndpoint(state).type !== "database"}>
        <TextArea {...{ state, dispatch }} />
      </RenderGate>
      <RenderGate condition={getActiveEndpoint(state).type === "database"}>
        <StyledTextArea
          value={formatJson(
            JSON.stringify(state.database[getActiveEndpoint(state).endpoint])
          )}
          disabled
        />
      </RenderGate>

      <Message>{getActiveEndpoint(state).message}</Message>
    </EditorWrapper>
  );
};

export default Editor;
