import styled, { css } from "styled-components";
import React, { useState } from "react";
import { PasswordForm, ProfileForm } from "../../components";
import { darken } from "polished";

export const Profile = () => {
  const [tabType, setTabType] = useState("information");

  const changeTabType = (_tabType) => setTabType(_tabType);

  return (
    <Container>
      <WrapperTabs tabType={tabType}>
        <div
          className="item-tab tab-information"
          onClick={() => changeTabType("information")}
        >
          Información
        </div>
        <div
          className="item-tab tab-password"
          onClick={() => changeTabType("password")}
        >
          Contraseña
        </div>
      </WrapperTabs>

      {tabType === "password" && <PasswordForm />}

      {tabType === "information" && <ProfileForm />}
    </Container>
  );
};

const WrapperTabs = styled.div`
  ${({ theme, tabType }) => css`
    display: flex;

    .item-tab {
      cursor: pointer;
      display: inline-block;
      padding: 0.8em 1em;
      background: ${darken(0.03, theme.colors.secondary)};
      &:hover {
        background: ${darken(0.01, theme.colors.secondary)};
      }
    }
    .tab-information {
      ${tabType === "information" &&
      css`
        background: ${theme.colors.primary};
        &:hover {
          background: ${darken(0.08, theme.colors.primary)};
        }
      `}
    }
    .tab-password {
      ${tabType === "password" &&
      css`
        background: ${theme.colors.primary};
        &:hover {
          background: ${darken(0.08, theme.colors.primary)};
        }
      `}
    }
  `}
`;

const Container = styled.section`
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 1em 0;
`;
