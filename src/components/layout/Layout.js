import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { Avatar } from "../ui";
import { Header } from "./Header";
import { NavbarList } from "./NavbarList";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <div className="navbar">
        <ContentNavbar>
          <Avatar />
          <NavbarList />
        </ContentNavbar>
      </div>
      <div className="body">{children}</div>
      <Footer />
    </LayoutContainer>
  );
};

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

  .navbar {
    width: 100%;
    height: 100%;
    grid-column: span 1;
    grid-row: span 1;
    background: #1e1e1e;
    display: none;
    position: sticky;
    top: 10vh;
    border-right: 1px solid #414040;
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
`;

const ContentNavbar = styled.div``;
