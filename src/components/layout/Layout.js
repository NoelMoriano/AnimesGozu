import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { Avatar } from "../ui";

export const Layout = ({ children }) => (
  <LayoutContainer>
    <div className="header">HEADER</div>
    <div className="navbar">
      <ContentNavbar>
        <Avatar />
      </ContentNavbar>
    </div>
    <div className="body">{children}</div>
    <div className="footer">Todos los derechos reservados - AnimeGozu</div>
  </LayoutContainer>
);

const LayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 25vw 1fr;
  grid-template-rows: 10vh 1fr 1fr 10vh;
  ${mediaQuery.minMobile} {
    grid-template-columns: 25vw 1fr;
  }
  ${mediaQuery.minTablet} {
    grid-template-columns: 20vw 1fr;
  }
  .header {
    grid-column: span 2;
    background: red;
    position: sticky;
    top: 0;
  }
  .navbar {
    width: 100%;
    height: 100%;
    grid-column: span 1;
    grid-row: span 1;
    background: orange;
    display: none;
    position: sticky;
    top: 10vh;
    ${mediaQuery.minTablet} {
      display: inherit;
    }
  }
  .body {
    grid-column: span 2;
    grid-row: span 2;
    background: greenyellow;
    ${mediaQuery.minTablet} {
      grid-column: span 1;
    }
  }
  .footer {
    grid-column: span 2;
    grid-row: span 3;
    background: mediumpurple;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ContentNavbar = styled.div``;
