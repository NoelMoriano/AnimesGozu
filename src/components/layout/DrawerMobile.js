import React from "react";
import styled, { css } from "styled-components";
import { Avatar, Button } from "../ui";
import { MenuList } from "./MenuList";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useAuthentication } from "../../providers/Authentication";

export const DrawerMobile = ({ visibleDrawer, onSetVisibleDrawer }) => {
  const navigate = useNavigate();

  const { authUser, logout } = useAuthentication();

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

      {authUser ? (
        <>
          <Avatar />
          <div className="menu-mobile-list">
            <MenuList
              title="Inicio"
              linkTo="/"
              className="link-section"
              onClick={() => onHiddenDrawerMobile()}
            />
            <MenuList
              title="Animes"
              linkTo="/search"
              className="link-section"
              onClick={() => onHiddenDrawerMobile()}
            />
            <a
              className="link-section"
              onClick={() => {
                onHiddenDrawerMobile();
                return logout();
              }}
            >
              <h3>Logout</h3>
            </a>
          </div>
        </>
      ) : (
        <div className="wrapper-buttons">
          <Button size="medium" onClick={() => navigate("/login")}>
            Iniciar sesion
          </Button>
          <Button
            size="medium"
            type="tertiary"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </Button>
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
  .menu-mobile-list {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .link-section {
      text-decoration: none;
      text-transform: uppercase;
      color: #fff;
      font-size: 0.9rem;
      cursor: pointer;
    }
  }
  .wrapper-buttons {
    display: flex;
    flex-direction: column;
    padding: 0.7rem 2rem;
  }
`;
