import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EpisodeItem } from "./EpisodeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { useNavigate, useParams } from "react-router";
import { orderBy } from "lodash";

export const EpisodeListSecondary = ({ episodes = [] }) => {
  const { animeId } = useParams();
  const navigate = useNavigate();

  const [isAscEpisodes, setIsAscEpisodes] = useState(false);

  const onWindowScrollTop = () => window.scrollTo(0, 0);

  const onNavigateTo = (param) => navigate(param);

  const episodesView = () =>
    orderBy(episodes, ["episodeNumber"], [isAscEpisodes ? "asc" : "desc"]);

  useEffect(() => {
    episodesView();
  }, [isAscEpisodes]);

  return (
    <Container>
      <WrapperHeader>
        <div className="item-title">
          <h5>Episodios</h5>
        </div>
        <div className="item-filters">
          <ul>
            <li>
              <Button
                size="small"
                onClick={() => setIsAscEpisodes(!isAscEpisodes)}
              >
                <FontAwesomeIcon
                  icon={
                    isAscEpisodes ? faArrowDownShortWide : faArrowUpShortWide
                  }
                  size="lg"
                />
              </Button>
            </li>
          </ul>
        </div>
      </WrapperHeader>
      <WrapperEpisodes>
        {episodesView().map((episode, index) => (
          <EpisodeItem
            key={index}
            title={episode.title || ""}
            number={episode.episodeNumber || index + 1}
            image={
              episode.episodeImage.url ||
              "https://storage.googleapis.com/animesgozu-dev.appspot.com/resources/image-no-found.jpeg"
            }
            onClick={() => {
              onNavigateTo(`/ver/${animeId}/${episode.episodeNumber}`);
              onWindowScrollTop();
            }}
            fontSize="13px"
          />
        ))}
      </WrapperEpisodes>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  position: relative;
  transition: all 0.2s ease-in-out;
  border-radius: 0.7rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

const WrapperEpisodes = styled.div`
  width: 100%;
  height: 100%;
  min-height: 25em;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.dark};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const WrapperHeader = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 0.8em;
  .item-title {
    display: flex;
    align-items: center;
    h5 {
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
