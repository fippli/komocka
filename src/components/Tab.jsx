import defer from "@codewell/defer";
import React from "react";
import styled, { css } from "styled-components";
import { eventAction } from "../core";
import Input from "./Input";

const Wrapper = styled.div`
  padding: 0 6px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-right: 5px;
  ${(props) =>
    props.selected &&
    css`
      background-color: #222;
      border-top: 2px solid #222;
      border-left: 2px solid #222;
      border-right: 2px solid #222;
      color: #fff;
    `}
  ${(props) =>
    !props.selected &&
    css`
      border-top: 2px dashed #222;
      border-left: 2px dashed #222;
      border-right: 2px dashed #222;
      color: #222;
    `}
`;

const Tab = ({ state, dispatch, endpoint, mappingIndex }) => {
  console.log(mappingIndex === state.active);

  return (
    <Wrapper
      onClick={defer(dispatch, { type: "SET_ACTIVE", payload: mappingIndex })}
      selected={mappingIndex === state.active}
    >
      <Input
        color="#fff"
        defaultValue={endpoint}
        onChange={eventAction(dispatch, "SET_ENDPOINT")}
      />
    </Wrapper>
  );
};

export default Tab;
