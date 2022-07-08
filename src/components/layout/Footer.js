import styled from "styled-components";
import React from "react";

export const Footer = () => {
  return <Container>Todos los derechos reservados - AnimeGozu</Container>;
};

const Container = styled.div`
  grid-column: span 2;
  grid-row: span 3;
  background: mediumpurple;
  display: flex;
  align-items: center;
  justify-content: center;
`;
