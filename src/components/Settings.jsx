import React from "react";
import styled from "styled-components";
import { eventAction } from "../core";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  background-color: #ffffff33;
  font-family: var(--monospace);
  font-size: 1rem;
  border: none;
  margin: 5px 0;
  color: black;
  font-size: 12px;
  flex: 1;
`;

const Label = styled.span`
  font-family: var(--monospace);
  font-size: 12px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Settings = ({ state, dispatch }) => (
  <Wrapper>
    <Row>
      <Label>http://localhost:</Label>
      <Input
        value={state.settings.url}
        onChange={eventAction(dispatch, "SET_URL")}
      />
    </Row>
    <Row>
      <Label>Delay: </Label>
      <Input
        value={state.settings.delay}
        onChange={eventAction(dispatch, "SET_DELAY")}
      />
    </Row>
    <Row>
      <Label>Status: </Label>
      <Input
        value={state.settings.status}
        onChange={eventAction(dispatch, "SET_STATUS")}
      />
    </Row>
  </Wrapper>
);

export default Settings;
