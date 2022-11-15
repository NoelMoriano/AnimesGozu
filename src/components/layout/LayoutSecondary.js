import React, { useState } from "react";
import styled from "styled-components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { WrapperContainer } from "../ui";
import { Header } from "./Header";
import { DrawerMobile } from "./DrawerMobile";

export const LayoutSecondary = ({ children }) => {
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
          <div className="body">{children}</div>
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
  width: 100vw;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.font1};
  overflow: hidden;
  ${mediaQuery.minDesktop} {
    height: 100vh;
  }
`;
