import ComponentMap from "@codewell/component-map/lib";
import defer from "@codewell/defer";
import React from "react";
import styled from "styled-components";
import Tab from "./Tab";

const TabWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  margin-right: 3px;
  ::-webkit-scrollbar {
    display: none;
  }
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

const TabMenu = ({ state, dispatch }) => {
  return (
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
  );
};

export default TabMenu;
