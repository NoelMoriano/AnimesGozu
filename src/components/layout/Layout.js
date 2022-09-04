import React, { useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { WrapperContainer } from "../ui";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Drawer } from "./Drawer";
import { DrawerMobile } from "./DrawerMobile";

export const Layout = ({ children }) => {
  const [visibleDrawer, setvisibleDrawer] = useState(false);

  return (
    <LayoutContainer>
      <DrawerMobile
        onSetVisibleDrawer={setvisibleDrawer}
        visibleDrawer={visibleDrawer}
      />
      <WrapperContainer>
        <LayoutContent>
          <Header onSetVisibleDrawer={setvisibleDrawer} />
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
  background: ${({ theme }) => theme.colors.secondary};
`;

const LayoutContent = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 15em 1fr;
  grid-template-rows: auto 1fr 1fr auto;
  background: inherit;

  .navbar {
    position: relative;
    grid-column: span 1;
    grid-row: span 2;
    width: 100%;
    height: 100%;
    display: none;
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
