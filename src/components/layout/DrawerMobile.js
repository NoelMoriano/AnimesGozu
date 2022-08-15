import styled, { css } from "styled-components";
import { Avatar, Button } from "../ui";
import { MenuList } from "./MenuList";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const DrawerMobile = ({ visibleDrawer, onSetVisibleDrawer }) => {
  const navigate = useNavigate();
  return (
    <Container visibleDrawer={visibleDrawer}>
      <div className="drawer-header">
        <div className="item-close">
          <FontAwesomeIcon
            icon={faClose}
            size="2x"
            onClick={() => onSetVisibleDrawer(!visibleDrawer)}
          />
        </div>
      </div>
      <Avatar />
      <div className="menu-mobile-list">
        <MenuList title="Inicio" linkTo="./" />
        <MenuList title="Animes" linkTo="./" />
        <MenuList title="En Emisión" linkTo="./" />
      </div>
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
  }
  .wrapper-buttons {
    display: flex;
    flex-direction: column;
    padding: 0.7rem 2rem;
  }
`;
