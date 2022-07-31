import React from "react";
import styled from "styled-components";
import { EpisodeItem } from "./EpisodeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { useNavigate, useParams } from "react-router";

export const EpisodeList = ({ episodes = [] }) => {
  const navigate = useNavigate();

  const { animeId } = useParams();

  return (
    <Container>
      <WrapperHeader>
        <div className="item-title">
          <h2>Lista de episodios</h2>
        </div>
        <div className="item-filters">
          <ul>
            <li>
              <Button size="small">
                Mayor o menor &nbsp;
                <FontAwesomeIcon icon={faArrowDownShortWide} size="lg" />
              </Button>
            </li>
          </ul>
        </div>
      </WrapperHeader>
      <WrapperEpisodes>
        {episodes.map((episode, index) => (
          <EpisodeItem
            key={index}
            title={episode.title || "Naruto"}
            number={episode.number || index + 1}
            image={
              episode.image ||
              "https://storage.googleapis.com/animes-dev-animes/animes/dumucB9YLN054VySLlu6/episodes/mUmBShtFWxSiskrJNOa2/episodeImage.jpeg"
            }
            onClick={() => navigate(`/${animeId}/${episode.number}`)}
          />
        ))}
      </WrapperEpisodes>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 1rem 0;
  padding: 1rem;
  position: relative;
  background: ${({ theme }) => theme.colors.tertiary};
  transition: all 0.2s ease-in-out;
  border-radius: 0.7rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

const WrapperEpisodes = styled.div`
  width: 100%;
  height: auto;
  max-height: 40em;
  overflow-y: auto;
`;

const WrapperHeader = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  .item-title {
    display: flex;
    align-items: center;
    h2 {
      margin: 0;
    }
  }
  .item-filters {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: flex-end;
      li {
        display: block;
      }
    }
  }
`;
