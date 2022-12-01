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
import { Input } from "./Input";
import ReactGA from "react-ga4";

export const EpisodeListSecondary = ({ episodes = [] }) => {
  const { animeId, episodeId } = useParams();
  const navigate = useNavigate();

  const [isAscEpisodes, setIsAscEpisodes] = useState(false);
  const [episodeNumber, setEpisodeNumber] = useState(null);

  const onWindowScrollTop = () => window.scrollTo(0, 0);

  const onNavigateTo = (param) => navigate(param);

  const episodesView = () => {
    const episodes_ = episodes.filter((episode) =>
      !episodeNumber ? true : episode.episodeNumber === episodeNumber
    );

    return orderBy(
      episodes_,
      ["episodeNumber"],
      [isAscEpisodes ? "asc" : "desc"]
    );
  };

  useEffect(() => {
    episodesView();
  }, [isAscEpisodes, episodeNumber]);

  return (
    <Container>
      <WrapperHeader>
        <div className="wrapper-titles">
          <div className="item-title">
            <h5>Episodios</h5>
          </div>
          <div className="item-filters">
            <ul>
              <li>
                <Button
                  size="small"
                  onClick={() => {
                    ReactGA.event({
                      category: "buttons",
                      action: "click-button-order-by-asc-or-desc-secondary",
                      label: `Click order episodes mayor o minor - secondary`,
                    });
                    setIsAscEpisodes(!isAscEpisodes);
                  }}
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
        </div>
        <div className="wrapper-episode-search">
          <Input
            fontSize="10px"
            type="number"
            placeHolder="Buscar episodio"
            onClick={() =>
              ReactGA.event({
                category: "inputs",
                action: "click-search-episode",
                label: `Click search episode: ${animeId}`,
              })
            }
            onChange={(e) => setEpisodeNumber(toNumber(e.target.value))}
          />
        </div>
      </WrapperHeader>

      <div className="wrapper-episodes">
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
            isSelected={toNumber(episodeId) === episode.episodeNumber}
            fontSize="12px"
          />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  ${mediaQuery.minDesktop} {
    width: 12em;
  }
  .wrapper-episodes {
    height: 100%;
    max-height: 100%;
  }
`;

const WrapperHeader = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.font1};
  padding: 1.3em 1em;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  ${mediaQuery.minTablet} {
    padding: 0 0.3em 0.4em 0.3em;
  }

  .wrapper-titles {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;

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
  }
  .wrapper-episode-search {
    width: 100%;
    box-sizing: border-box;
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;
