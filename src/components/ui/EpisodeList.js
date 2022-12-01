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
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { ScrollStyle } from "../../styles/constants/mixins";
import ReactGA from "react-ga4";

export const EpisodeList = ({ episodes = [] }) => {
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
          <h4>Lista de episodios</h4>
        </div>
        <div className="item-filters">
          <ul>
            <li>
              <Button
                size="small"
                onClick={() => {
                  ReactGA.event({
                    category: "buttons",
                    action: "click-button-order-by-asc-or-desc",
                    label: `Click order episodes mayor o minor`,
                  });
                  setIsAscEpisodes(!isAscEpisodes);
                }}
              >
                Mayor o menor &nbsp;
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
            animeId={animeId || ""}
            number={episode.episodeNumber || index + 1}
            image={
              episode.episodeImage.url ||
              "https://storage.googleapis.com/animesgozu-dev.appspot.com/resources/image-no-found.jpeg"
            }
            onClick={() => {
              onNavigateTo(`/ver/${animeId}/${episode.episodeNumber}`);
              onWindowScrollTop();
            }}
          />
        ))}
      </WrapperEpisodes>
    </Container>
  );
};

const Container = styled.div`
  width: 87%;
  height: auto;
  margin: auto;
  padding: 1em;
  position: relative;
  background: ${({ theme }) => theme.colors.tertiary};
  transition: all 0.2s ease-in-out;
  border-radius: 0.7rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

const WrapperEpisodes = styled.div`
  width: auto;
  height: auto;
  max-height: 30em;
  overflow-y: auto;

  ${ScrollStyle};
`;

const WrapperHeader = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  ${mediaQuery.minMobile} {
    grid-template-columns: 1fr auto;
  }
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
