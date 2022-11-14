import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { useDevice } from "../../hooks";

export const EpisodeItem = ({
  title = "Naruto",
  number,
  image = "https://storage.googleapis.com/animes-dev-animes/animes/dumucB9YLN054VySLlu6/episodes/mUmBShtFWxSiskrJNOa2/episodeImage.jpeg",
  onClick,
}) => {
  const { isMobile } = useDevice();

  return (
    <Container>
      <div className="item-left" onClick={() => onClick()}>
        <img loading="lazy" src={image} alt={`episode ${number}`} />
      </div>
      <div className="item-center">
        <div className="titles" onClick={() => onClick()}>
          <h5>Episodio {number}</h5>
        </div>
      </div>
      {isMobile && (
        <div className="item-right">
          <FontAwesomeIcon
            className="icon-play"
            icon={faCirclePlay}
            size="2x"
            onClick={() => onClick()}
          />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.7rem;
  padding: 0.8rem 0.4rem;
  background: #0e0e0e;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(14, 14, 14, 0.7);
  }

  &:active {
    transition: all 0.1s ease-in-out;
    background: ${({ theme }) => theme.colors.primary};
  }

  .item-left {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      max-width: 4.8em;
      height: 2.8em;
      object-fit: cover;
    }
  }
  .item-center {
    display: flex;
    align-items: center;
    justify-content: start;
    .titles {
      font-size: 0.9em;
      padding-left: 0.3em;
    }
  }
  .item-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.3em;
    .icon-play {
      transition: all ease-in-out 0.3s;
      &:hover,
      &:active {
        transition: all ease-in-out 0.3s;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
