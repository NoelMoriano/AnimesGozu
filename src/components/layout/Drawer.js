import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "../ui";
import { useAuthentication } from "../../providers/Authentication";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export const Drawer = () => {
  const navigate = useNavigate();

  const { authUser, logout } = useAuthentication();

  const onNavigateTo = (param) => navigate(param);

  return (
    <Container>
      {authUser ? (
        <>
          <Avatar
            ImgAvatar={authUser.providerData?.photoURL}
            nickName={authUser?.nickName || authUser?.firstName}
          />
          <div className="menu-list">
            <Link to="/" className="link-section">
              <h3>Inicio</h3>
            </Link>
            <Link to="/profile" className="link-section">
              <h3>Perfil</h3>
            </Link>
            <Link to="/search" className="link-section">
              <h3>Animes</h3>
            </Link>
            <a className="link-section" onClick={() => logout()}>
              <h3>Logout</h3>
            </a>
          </div>
        </>
      ) : (
        <div className="wrapper-buttons">
          <Button size="medium" onClick={() => onNavigateTo("/login")}>
            Iniciar sesion
          </Button>
          <Button
            size="medium"
            type="tertiary"
            onClick={() => onNavigateTo("/register")}
          >
            Registrarse
          </Button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  .menu-list {
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
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
