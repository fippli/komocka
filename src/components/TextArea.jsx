import React from "react";
import styled from "styled-components";
import { eventAction } from "../core";
import defer from "@codewell/defer";

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledTextArea = styled.textarea`
  background-color: transparent;
  display: flex;
  border: none;
  font-family: var(--scribble);
  font-size: 1rem;
  width: 100%;
  height: 100%;
  resize: none;
  letter-spacing: 1px;

  :focus {
    outline: none;
  }
`;

const Message = styled.span`
  font-family: "Source code pro", monospace;
  font-size: 12px;
  width: 100%;
  text-align: right;
`;

const TextArea = ({ state, dispatch }) => {
  return (
    <Wrapper>
      <StyledTextArea
        placeholder="json..."
        onInput={eventAction(dispatch, "SET_MOCK")}
        value={state.mock}
        onBlur={defer(dispatch, { type: "SET_READY_TO_FORMAT", payload: true })}
      />

      <Message>{state.message}</Message>
    </Wrapper>
  );
};

export default TextArea;
