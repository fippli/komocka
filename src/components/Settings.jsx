import React from "react";
import styled from "styled-components";
import { eventAction } from "../core";
import Input from "./Input";
import Label from "./Label";
import Row from "./Row";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Settings = ({ state, dispatch }) => (
  <Wrapper>
    <Row style={{ justifyContent: "center" }}>
      <Label>http://localhost:</Label>
      <Input
        size={5}
        value={state.port}
        onChange={eventAction(dispatch, "SET_PORT")}
      />
    </Row>
  </Wrapper>
);

export default Settings;
