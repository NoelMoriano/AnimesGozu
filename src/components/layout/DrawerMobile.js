import React from "react";
import styled, { css } from "styled-components";
import { Button, InputSearch } from "../ui";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useAuthentication } from "../../providers";
import { UserMenu } from "./UserMenu";
import ReactGA from "react-ga4";

export const DrawerMobile = ({ visibleDrawer, onSetVisibleDrawer }) => {
  const navigate = useNavigate();

  const { authUser, logout } = useAuthentication();

  const onNavigateTo = (param) => navigate(param);

  const onHiddenDrawerMobile = () => onSetVisibleDrawer(!visibleDrawer);

  return (
    <Container visibleDrawer={visibleDrawer}>
      <div className="drawer-header">
        <div className="item-close">
          <FontAwesomeIcon
            icon={faClose}
            size="2x"
            onClick={() => onHiddenDrawerMobile()}
          />
        </div>
      </div>

      <div className="wrapper-input-search">
        <InputSearch onVisibleDrawerMobile={() => onHiddenDrawerMobile()} />
      </div>
      {authUser ? (
        <UserMenu
          onLogout={logout}
          onHiddenDrawerMobile={onHiddenDrawerMobile}
        />
      ) : (
        <div className="wrapper-no-auth-user">
          <div className="wrapper-buttons">
            <Button
              size="medium"
              onClick={() => {
                ReactGA.event({
                  category: "buttons",
                  action: "click-button-sign-in-mb",
                  label: "Click button sign in - mb",
                });

                onNavigateTo("/login");
              }}
            >
              Iniciar sesion
            </Button>
            <Button
              size="medium"
              type="tertiary"
              onClick={() => {
                ReactGA.event({
                  category: "buttons",
                  action: "click-button-register-mb",
                  label: "Click button register - mb",
                });

                onNavigateTo("/register");
              }}
            >
              Registrarse
            </Button>
          </div>
          <div className="wrapper-message">
            <p>
              Al registrarte podrás solicitar tus animes favoritos y nosotros te
              lo enlistamos. Para nosotros es super importante su comodidad al
              usar nuestra plataforma, te agradeceremos mucho tus sugerencias
              para mejorar la plataforma ^^
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  transition: all ease-in-out 0.3s;
  padding: 1em;
  ${({ visibleDrawer }) =>
    visibleDrawer
      ? css`
          transform: translateX(0%);
        `
      : css`
          transform: translateX(-100%);
        `}
  .drawer-header {
    padding: 1rem;
    display: flex;
    justify-content: end;
    .item-close {
      color: ${({ theme }) => theme.colors.white};
    }
  }
  .wrapper-input-search {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
    width: 100%;
  }
  .wrapper-no-auth-user {
    .wrapper-buttons {
      display: flex;
      flex-direction: column;
      padding: 0.7rem 0;
    }
    .wrapper-message {
      text-align: center;
      margin-top: 1em;
    }
  }
`;
