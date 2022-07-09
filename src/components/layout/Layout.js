import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { Avatar, WrapperContainer } from "../ui";
import { Header } from "./Header";
import { NavbarList } from "./NavbarList";
import { Footer } from "./Footer";

export const Layout = ({ children }) => (
  <LayoutContainer>
    <WrapperContainer>
      <LayoutContent>
        <Header />
        <div className="navbar">
          <Avatar />
          <NavbarList />
        </div>
        <div className="body">{children}</div>
        <Footer />
      </LayoutContent>
    </WrapperContainer>
  </LayoutContainer>
);

const LayoutContainer = styled.div`
  width: 100vw;
  background: ${({ theme }) => theme.colors.secondary};
`;

const LayoutContent = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 17em 1fr;
  grid-template-rows: auto 1fr 1fr auto;
  background: inherit;

  .navbar {
    grid-column: span 1;
    grid-row: span 1;
    width: 100%;
    height: 100%;
    display: none;
    position: sticky;
    top: 10vh;

    ${mediaQuery.minTablet} {
      display: block;
    }
  }

  .body {
    grid-column: span 2;
    grid-row: span 2;

    ${mediaQuery.minTablet} {
      grid-column: span 1;
    }
  }
`;
