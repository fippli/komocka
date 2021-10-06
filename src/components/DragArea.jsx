import styled from "styled-components";

const DragArea = styled.div`
  height: 26px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  -webkit-app-region: drag;

  :hover {
    background-color: #efefef;
  }

  :active {
    background-color: #e8e8e8;
  }
`;

export default DragArea;
