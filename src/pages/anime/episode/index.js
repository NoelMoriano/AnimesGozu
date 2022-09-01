import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { EpisodeList, Servers, Spinner } from "../../../components";
import { capitalize, defaultTo, isEmpty } from "lodash";
import { currentConfig } from "../../../firebase/index";
import { mediaQuery } from "../../../styles/constants/mediaQuery";
import { useAnimes } from "../../../providers/Animes";

export const Episode = () => {
  const { animeId, episodeId } = useParams();
  const navigate = useNavigate();

  const { animes } = useAnimes();

  const [anime, setAnime] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [servers, setServers] = useState([]);
  const [serverView, setServerView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await findAnime();
      await fetchEpisode();
      await fetchEpisodes();
    })();
  }, [episodeId]);

  const onNavigateTo = (param) => navigate(param);

  const findAnime = () => {
    const anime_ = animes.find((anime) => anime.id === animeId);
    setAnime(anime_);
  };

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

  console.log("anime->", anime);

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
            </div>
          </div>
        </div>
      </WrapperHomeBanner>
      {isEmpty(episodes) ? (
        <h3>No se encontraron episodios</h3>
      ) : (
        <WrapperDetail>
          <Servers
            servers={servers}
            serverView={serverView}
            onSetServerEpisode={onSetServerEpisode}
          />

          {(anime || episode) && (
            <div className="episode-detail">
              {anime && (
                <div className="sub-title">
                  <h4>{capitalize(anime.name)}</h4>
                </div>
              )}
              {episode?.episodeNumber && (
                <div className="title">
                  <h1>Episodio {episode.episodeNumber}</h1>
                </div>
              )}
            </div>
          )}

          <EpisodeList episodes={episodes} />
        </WrapperDetail>
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

const WrapperDetail = styled.div`
  width: 100%;
  height: auto;
  .episode-detail {
    width: 100%;
    padding: 1.7em 1em;
    .sub-title {
      margin-bottom: 0.7em;
    }
    .title {
      font-size: 0.5em;
      ${({ theme }) => theme.colors.white}
    }
  }
`;

const WrapperHomeBanner = styled.div`
  width: 100%;
  height: 50vh;
  max-height: 20em;
  position: relative;
  ${mediaQuery.minTablet} {
    height: 65vh;
    max-height: 31em;
  }
  .banner-wrapper {
    width: 100%;
    height: 100%;
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
