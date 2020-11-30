import React from "react";
import styled from "styled-components";
import { eventAction } from "../core";
import defer from "@codewell/defer";

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
  padding: 1rem;
  color: #fff;

  :focus {
    outline: none;
  }
`;

const TextArea = ({ state, dispatch }) => (
  <StyledTextArea
    placeholder="json..."
    onInput={eventAction(dispatch, "SET_MOCK")}
    value={state.endpoints[state.active].mock}
    onBlur={defer(dispatch, { type: "SET_READY_TO_FORMAT", payload: true })}
  />
);

export default TextArea;
