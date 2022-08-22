import styled from "styled-components";
import { Avatar, Button } from "../ui";
import { useNavigate } from "react-router";
import React from "react";
import { useAuthentication } from "../../providers/Authentication";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export const Drawer = () => {
  const navigate = useNavigate();

  const { existsAuthUser } = useAuthentication();

  const onSingUp = async () => {
    await auth.signOut();
  };

  return (
    <Container>
      {!existsAuthUser ? (
        <>
          <Avatar />
          <div className="menu-list">
            <Link to="/" className="link-section">
              <h3>Inicio</h3>
            </Link>
            <Link to="/search" className="link-section">
              <h3>Animes</h3>
            </Link>
            <a className="link-section" onClick={() => onSingUp()}>
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
