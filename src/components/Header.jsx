import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: var(--scribble);
  text-align: center;
  font-size: 3.5rem;
  margin: 1rem 0;
  -webkit-app-region: drag;
`;

const Image = styled.img`
  width: 200px;
  -webkit-app-region: drag;
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>Komocka</Title>
      <Image src="art.png" alt="" />
    </Wrapper>
  );
};

export default Header;
