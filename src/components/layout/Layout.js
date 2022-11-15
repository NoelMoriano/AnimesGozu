import React, { useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { WrapperContainer } from "../ui";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Drawer } from "./Drawer";
import { DrawerMobile } from "./DrawerMobile";

export const Layout = ({ children }) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  return (
    <LayoutContainer>
      <DrawerMobile
        onSetVisibleDrawer={setVisibleDrawer}
        visibleDrawer={visibleDrawer}
      />
      <WrapperContainer>
        <LayoutContent>
          <Header onSetVisibleDrawer={setVisibleDrawer} />
          <div className="navbar">
            <Drawer />
          </div>
          <div className="body">{children}</div>
          <Footer />
        </LayoutContent>
      </WrapperContainer>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  width: 100vw;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
`;

const LayoutContent = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  background: inherit;
  ${mediaQuery.minTablet} {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr 1fr auto;
  }

  .navbar {
    position: relative;
    grid-column: span 1;
    grid-row: span 2;
    width: 13em;
    height: 100%;
    display: none;
    ${mediaQuery.minTablet} {
      display: block;
    }
  }

  .body {
    width: 100%;
    grid-row: span 2;
  }
`;
