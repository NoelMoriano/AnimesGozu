import React from "react";
import styled from "styled-components";

export const Layout = ({ children }) => (
  <LayoutContainer>
    <div className="header">HEADER</div>
    <div className="navbar">NAVBAR</div>
    <div className="body">{children}</div>
    <div className="footer">
      Todos los derechos reservados - Agencia Servitec
    </div>
  </LayoutContainer>
);

const LayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 20% 1fr;
  grid-template-rows: 10vh 1fr 10vh;
  .header {
    grid-column: span 2;
    background: red;
  }
  .navbar {
    grid-column: span 1;
    grid-row: span 2;
    background: orange;
  }
  .body {
    grid-column: span 1;
    grid-row: span 2;
    background: greenyellow;
  }
  .footer {
    grid-column: span 2;
    grid-row: span 3;
    background: mediumpurple;
  }
`;
