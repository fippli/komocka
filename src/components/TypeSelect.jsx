import React from "react";
import { eventAction, getActiveEndpoint } from "../core";
import Select from "./Select";

const TypeSelect = ({ state, dispatch }) => (
  <Select
    onChange={eventAction(dispatch, "SET_TYPE")}
    value={getActiveEndpoint(state).type}
  >
    <option value="json">JSON</option>
    <option value="file">File</option>
    <option value="database">Database</option>
  </Select>
);

export default TypeSelect;
