import React from "react";
import { eventAction, getActiveEndpoint } from "../core";
import Select from "./Select";

const MethodSelect = ({ state, dispatch }) => (
  <Select
    onChange={eventAction(dispatch, "SET_METHOD")}
    value={getActiveEndpoint(state).method}
  >
    <option value="get">GET</option>
    <option value="put">PUT</option>
    <option value="post">POST</option>
    <option value="delete">DELETE</option>
  </Select>
);

export default MethodSelect;
