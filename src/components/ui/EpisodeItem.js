import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

export const EpisodeItem = ({
  title = "Naruto",
  number,
  image = "https://storage.googleapis.com/animes-dev-animes/animes/dumucB9YLN054VySLlu6/episodes/mUmBShtFWxSiskrJNOa2/episodeImage.jpeg",
}) => (
  <Container>
    <div className="item-left">
      <img src={image} alt={`episode ${number}`} />
    </div>
    <div className="item-center">
      <div className="titles">
        <h4>{title}</h4>
        <h4>Episodio {number}</h4>
      </div>
    </div>
    <div className="item-right">
      <FontAwesomeIcon className="icon-search" icon={faCirclePlay} size="2x" />
    </div>
  </Container>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 10%;
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
  .item-left {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 7rem;
      height: 4rem;
      object-fit: contain;
    }
  }
  .item-center {
    display: flex;
    align-items: center;
    justify-content: start;
    .titles {
      h3 {
        font-size: 1.3rem;
      }
    }
  }
  .item-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
