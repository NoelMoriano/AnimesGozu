import React from "react";
import styled from "styled-components";

export const WrapperContainer = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1700px;
  margin: auto;
  box-sizing: border-box;
`;
