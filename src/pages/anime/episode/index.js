import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { EpisodeList, Servers, Spinner } from "../../../components";
import { defaultTo, isEmpty } from "lodash";
import { currentConfig } from "../../../firebase";

export const Episode = () => {
  const { animeId, episodeId } = useParams();
  const navigate = useNavigate();

  const [servers, setServers] = useState([]);
  const [serverView, setServerView] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchEpisode();
      await fetchEpisodes();
    })();
  }, [episodeId]);

  const onNavigateTo = (param) => navigate(param);

  const fetchEpisode = async () => {
    try {
      const url = `${currentConfig.animeServerApi}/episode/${animeId}/${episodeId}`;
      const response = await fetch(url);

      const result = await response.json();

      if (isEmpty(result)) return onNavigateTo(`/ver/${animeId}`);

      const episodeData = result[0] || null;

      const serverDefault =
        episodeData.servers["SUB"].find((server) => server.server === "sb") ||
        null;

      setEpisode(episodeData);
      setServers(episodeData.servers || []);
      setServerView(serverDefault);
    } catch (error) {
      console.error("errorFetchEpisode:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSetServerEpisode = (server) => {
    setServerView(null);
    setServerView(server);
  };

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const url = `${currentConfig.animeServerApi}/episodes/${animeId}`;
      const response = await fetch(url);
      const result = await response.json();
      setEpisodes(result);
    } catch (error) {
      console.error("errorFetchEpisodes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner fullscreen />;

  return (
    <Container>
      <WrapperHomeBanner bgBanner={episode?.episodeImage?.url || ""}>
        <div className="banner-wrapper">
          <div className="gradient">
            <div className="content-banner">
              {serverView && (
                <iframe
                  key={serverView.code || episodeId}
                  className="iframe-episode"
                  src={defaultTo(serverView.url || serverView.code, "")}
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  marginHeight="0"
                  marginWidth="0"
                  width="100%"
                  height="100%"
                />
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
      {isEmpty(episodes) ? (
        <h1>No se encontraron episodios</h1>
      ) : (
        <>
          <Servers
            servers={servers}
            serverView={serverView}
            onSetServerEpisode={onSetServerEpisode}
          />
          <EpisodeList episodes={episodes} />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.font1};
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
