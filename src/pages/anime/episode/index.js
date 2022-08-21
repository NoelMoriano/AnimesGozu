import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Button, EpisodeList } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { EpisodesData } from "../../../data-list";
import { defaultTo, orderBy } from "lodash";
import { currentConfig } from "../../../firebase";

export const Episode = () => {
  const { animeId, episodeId } = useParams();

  const [servers, setServers] = useState([]);
  const [serverView, setServerView] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [episodes, setEspisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisode();
    fetchEpisodes();
  }, [episodeId]);

  const fetchEpisode = async () => {
    try {
      const url = `${currentConfig.animeServerApi}/episode/${animeId}/${episodeId}`;
      const response = await fetch(url);
      const result = await response.json();
      const episodeData = result[0];

      const serverDefault = episodeData.servers["SUB"].find(
        (server) => server.server === "sb"
      );

      console.log("serverDefault", serverDefault);

      setServers(episodeData.servers["SUB"]);
      setEpisode(episodeData);
      setServerView(serverDefault.url);
    } catch (error) {
      console.error("errorFetchEpisode->", error);
    } finally {
      setLoading(false);
    }
  };

  const viewEpisode = (url) => {
    setServerView(null);
    setServerView(url);
  };

  const fetchEpisodes = async () => {
    try {
      const url = `${currentConfig.animeServerApi}/episodes/${animeId}`;
      const response = await fetch(url);
      const result = await response.json();
      setEspisodes(result);
    } catch (error) {
      console.error("errorFetchEpisodes->", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("serverView=>", serverView);
  if (loading) return "loading...";
  return (
    <Container>
      <WrapperHomeBanner bgBanner={episode?.episodeImage?.url || ""}>
        <div className="banner-wrapper">
          <div className="gradient">
            <div className="content-banner">
              {episodeId && (
                <iframe
                  key={episodeId}
                  className="iframe-episode"
                  src={defaultTo(serverView, "")}
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen
                ></iframe>
              )}
              {/*<div className="item-play">*/}
              {/*  <Button*/}
              {/*    size="medium"*/}
              {/*    borderRadius="50%"*/}
              {/*    width="4rem"*/}
              {/*    height="4rem"*/}
              {/*  >*/}
              {/*    <FontAwesomeIcon icon={faPlay} size="2x" />*/}
              {/*  </Button>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </WrapperHomeBanner>
      <div className="wrapper-servers">
        <div className="item-servers">
          <ul>
            {servers.map((server, index) => (
              <li
                key={index}
                onClick={() => viewEpisode(server.url || server.code)}
              >
                {server.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <EpisodeList episodes={orderBy(episodes, ["episodeNumber"], ["asc"])} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.font1};

  .wrapper-servers {
    width: 100%;
    max-width: 100%;
    background: ${({ theme }) => theme.colors.tertiary};
    .item-servers {
      position: relative;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      ul {
        width: 100%;
        //overflow-x: scroll;
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        li {
          cursor: pointer;
          width: auto;
          min-width: 7rem;
          padding: 0.5em 1em;
          &:first-child {
            border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }
  }
`;

const WrapperHomeBanner = styled.div`
  width: 100%;
  height: 70vh;
  max-height: 40em;
  position: relative;
  .banner-wrapper {
    width: 100%;
    height: 70vh;
    max-height: 40em;
    background: #000 url(${({ bgBanner }) => bgBanner}) no-repeat;
    background-size: cover;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .gradient {
      width: 100%;
      height: 100%;
      background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#070707),
        color-stop(#e66aa800),
        to(#070707)
      );
      background-image: linear-gradient(#070707, #e66aa800, #070707);
      .content-banner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .iframe-episode {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
