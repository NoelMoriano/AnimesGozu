import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <Container>
      <div className="wrapper-content">
        <div>
          AnimeGozu - Ningún vídeo se encuentra alojado en nuestros servidores.
        </div>
        <div>
          Desarrollado con
          <FontAwesomeIcon icon={faHeart} color="red" className="item-icon" />
          para el mundo
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  grid-column: span 2;
  grid-row: span 3;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .wrapper-content {
    width: 100%;
    padding: 1.5rem;
    div {
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.font2};
      .item-icon {
        margin: 0 0.3rem;
      }
    }
    div:last-child {
      margin-top: 0.4rem;
    }
  }
`;
