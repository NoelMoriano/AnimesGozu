import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <Container>
      <div className="social-container">
        <h3>Siguenos en:</h3>
        <div className="socials-list">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
          <FontAwesomeIcon icon={faTiktok} size="2x" />
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </div>
      </div>
      <div>
        AnimeGozu - Ningun vídeo se encuentra alojado en nuestros servidores.
      </div>
    </Container>
  );
};

const Container = styled.div`
  grid-column: span 2;
  grid-row: span 3;
  background: #0e0e0e;
  z-index: 9999;
  color: #fff;

  .social-container {
    padding: 1.5rem 3rem;
    h3 {
      font-size: 2rem;
    }
    .socials-list {
      display: flex;
      gap: 1rem;
    }
  }

  .wrapper-content {
    width: 100%;
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${mediaQuery.minTablet} {
      flex-direction: row;
      justify-content: space-between;
    }

    div {
      font-size: 0.8rem;
      font-weight: 500;
      text-align: center;
      color: ${({ theme }) => theme.colors.font2};
      .item-icon {
        margin: 0 0.3rem;
      }
    }
    div:last-child {
      text-align: center;
      margin-top: 0.4rem;
      ${mediaQuery.minTablet} {
        text-align: left;
      }
    }
    div:last-child {
      text-align: center;
      margin-top: 0.4rem;
      ${mediaQuery.minTablet} {
        text-align: right;
      }
    }
  }
`;
