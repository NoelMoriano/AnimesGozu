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
import { orderBy, toNumber } from "lodash";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const EpisodeListSecondary = ({ episodes = [] }) => {
  const { animeId, episodeId } = useParams();
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
          isSelected={toNumber(episodeId) === episode.episodeNumber}
          fontSize="12px"
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  ${mediaQuery.minDesktop} {
    width: 12em;
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
