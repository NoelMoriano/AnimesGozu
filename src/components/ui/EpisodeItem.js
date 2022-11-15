import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

export const EpisodeItem = ({
  number,
  image = "https://storage.googleapis.com/animes-dev-animes/animes/dumucB9YLN054VySLlu6/episodes/mUmBShtFWxSiskrJNOa2/episodeImage.jpeg",
  onClick,
  fontSize = "16px",
  isSelected = false,
}) => (
  <Container
    fontSize={fontSize}
    isSelected={isSelected}
    onClick={() => onClick()}
  >
    <div className="item-left">
      <img loading="lazy" src={image} alt={`episode ${number}`} />
    </div>
    <div className="item-center">
      <div className="titles">
        <span>Episodio</span>
        <h6>{number}</h6>
      </div>
    </div>
    <div className="item-right">
      <FontAwesomeIcon
        className="icon-play"
        icon={faCirclePlay}
        onClick={() => onClick()}
      />
    </div>
  </Container>
);

const Container = styled.div`
  ${({ theme, fontSize, isSelected }) => css`
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 0.7rem;
    padding: 0.8rem 0.4rem;
    border-bottom: 1px solid ${theme.colors.tertiary};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: ${fontSize};
    background: #0e0e0e;
    color: ${theme.colors.font2};

    ${isSelected &&
    css`
      background: ${theme.colors.primary};
    `}

    &:hover {
      ${!isSelected &&
      css`
        transition: all 0.2s ease-in-out;
        background: rgba(35, 35, 35, 0.82);
      `}
    }

    &:active {
      transition: all 0.1s ease-in-out;
      background: ${theme.colors.primary};
    }

    .item-left {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        max-width: 5.2em;
        height: 3em;
        object-fit: cover;
      }
    }

    .item-center {
      display: flex;
      align-items: center;
      justify-content: start;

      .titles {
        font-size: 1em;
        padding-left: 0.5em;
        text-align: left;

        span {
          font-size: 0.9em;
        }
      }
    }

    .item-right {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.3em;

      .icon-play {
        transition: all ease-in-out 0.3s;
        font-size: 1.7em;

        ${!isSelected &&
        css`
          &:hover,
          &:active {
            transition: all ease-in-out 0.3s;
            color: ${theme.colors.primary};
          }
        `}
      }
    }
  `}
`;
