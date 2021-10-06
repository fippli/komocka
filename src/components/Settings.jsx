import {
  faFolderOpen,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { eventAction } from "../core";
import Input from "./Input";
import Label from "./Label";
import Row from "./Row";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #d9d9d9;
  :hover {
    color: #00ff00;
  }
  cursor: pointer;
  margin-left: 5px;
`;

const Settings = ({ state, dispatch }) => (
  <Wrapper>
    <Row>
      <Label>http://localhost:</Label>
      <Input
        size={5}
        value={state.port}
        onChange={eventAction(dispatch, "SET_PORT")}
      />
    </Row>
    <Row style={{ marginLeft: "auto" }}>
      <Icon icon={faFolderOpen} />
      <Icon icon={faSave} />
    </Row>
  </Wrapper>
);

export default Settings;
