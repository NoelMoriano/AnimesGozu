import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDevice } from "../../hooks";

export const UserMenu = ({ onHiddenDrawerMobile, onLogout }) => {
  const { isMobile } = useDevice();

  return (
    <Container>
      <div className="menu-list">
        <Link
          to="/"
          className="link-section"
          onClick={() => isMobile && onHiddenDrawerMobile()}
        >
          <h4>Inicio</h4>
        </Link>
        <Link
          to="/profile"
          className="link-section"
          onClick={() => isMobile && onHiddenDrawerMobile()}
        >
          <h4>Perfil</h4>
        </Link>
        <Link
          to="/search"
          className="link-section"
          onClick={() => isMobile && onHiddenDrawerMobile()}
        >
          <h4>Animes</h4>
        </Link>
        <span className="link-section" onClick={() => onLogout()}>
          <h4>Cerrar session</h4>
        </span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  .menu-list {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    font-size: 0.8em;
    .link-section {
      text-decoration: none;
      text-transform: uppercase;
      color: #fff;
      cursor: pointer;
      text-align: center;
    }
  }
`;
