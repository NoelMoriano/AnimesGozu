import React from "react";
import styled from "styled-components";

export const Layout = ({ children }) => (
  <LayoutContainer>
    <div className="body">{children}</div>
    <div className="footer">
      <p>Todos los derechos reservados - Agencia Servitec</p>
    </div>
  </LayoutContainer>
);

const LayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
`;
