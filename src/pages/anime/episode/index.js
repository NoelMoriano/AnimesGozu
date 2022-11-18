import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import {
  CommentsAnime,
  EpisodeListSecondary,
  Servers,
  Spinner,
} from "../../../components";
import { isEmpty, defaultTo } from "lodash";
import { currentConfig } from "../../../firebase/index";
import { mediaQuery } from "../../../styles/constants/mediaQuery";
import { useAnimes } from "../../../providers";
import { ScrollStyle } from "../../../styles/constants/mixins";

export const Episode = () => {
  const { animeId, episodeId } = useParams();
  const navigate = useNavigate();
  const { animes } = useAnimes();

  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState(null);
  const [servers, setServers] = useState([]);
  const [serverView, setServerView] = useState(null);
  const [serverType, setServerType] = useState("SUB");
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [loading, setLoading] = useState(true);

  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (async () => {
      await fetchEpisodes();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await findAnime();
      await fetchEpisode();
    })();
  }, [animeId, episodeId, serverType]);

  const onNavigateTo = (param) => navigate(param);

  const findAnime = () => {
    const anime_ = animes.find((anime) => anime.id === animeId);
    if (!anime_) return onGoBack();

    setAnime(anime_);
  };

  const fetchEpisode = async () => {
    try {
      const url = `${currentConfig.animeServerApi}/episode/${animeId}/${episodeId}`;
      const response = await fetch(url);

      const result = await response.json();

      if (isEmpty(result)) return onNavigateTo(`/anime/${animeId}`);

      const episodeData = result[0] || [];

      const serverDefault =
        episodeData.servers[serverType].find(
          (server) => server.server === "sb" || server.server === "okru"
        ) || null;

      setEpisode(episodeData || null);
      setServers(episodeData.servers || []);
      setServerView(serverDefault || null);
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
      setLoadingEpisodes(true);
      const url = `${currentConfig.animeServerApi}/episodes/${animeId}`;
      const response = await fetch(url);
      const result = await response.json();
      setEpisodes(result);
    } catch (error) {
      console.error("errorFetchEpisodes:", error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  if (loadingEpisodes) return <Spinner height="100vh" />;

  return (
    <Container>
      <div className="left-content">
        <div className="content">
          <EpisodeListSecondary episodes={episodes} />
        </div>
      </div>
      <div className="center-content">
        <div className="content">
          <WrapperHomeBanner
            bgBanner={loading ? "" : episode?.episodeImage?.url || ""}
          >
            <div className="banner-wrapper">
              <div className="gradient">
                {loading ? (
                  <Spinner fullscreen />
                ) : (
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
                )}
              </div>
            </div>
          </WrapperHomeBanner>
          {isEmpty(episodes) ? (
            <h3>No se encontraron episodios</h3>
          ) : (
            !isEmpty(episode) && (
              <WrapperDetail>
                <Servers
                  servers={servers}
                  serverView={serverView}
                  onSetServerEpisode={onSetServerEpisode}
                  anime={anime}
                  episode={episode}
                  onNavigateTo={onNavigateTo}
                  serverType={serverType}
                  onSetServerType={setServerType}
                />
                {(anime || episode) && (
                  <div className="episode-detail">
                    <div className="sub-title">
                      <h4>Episodio {episode.episodeNumber}</h4>
                    </div>
                    <div className="title">
                      <h1>{anime.name}</h1>
                    </div>
                  </div>
                )}
              </WrapperDetail>
            )
          )}
        </div>
      </div>
      <div className="right-content">
        <div className="content">
          {(anime || episode) && (
            <CommentsAnime
              article={{
                url: `${window.location.origin}${window.location.pathname}`,
                identifier: `episode_${anime.id}`,
                title: `${anime.name} - episodio ${episode?.episodeNumber}`,
              }}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  ${mediaQuery.minDesktop} {
    grid-template-columns: auto 1fr 28em;
    grid-template-rows: auto 1fr;
  }

  .left-content,
  .center-content,
  .right-content {
    width: 100%;
    height: 100%;
    .content {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      max-height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      transition: all 0.2s ease;
      position: relative;
      ${ScrollStyle};

      ${mediaQuery.minDesktop} {
        height: calc(100vh - 52px);
      }
    }
  }

  ${mediaQuery.maxTablet} {
    .left-content {
      order: 2;
      .content {
        height: calc(41vh - 52px);
      }
    }
    .center-content {
      order: 1;
    }
    .right-content {
      order: 3;
    }
  }
`;

const WrapperDetail = styled.div`
  width: 100%;
  height: auto;
  .episode-detail {
    width: 100%;
    padding: 1.3em 1em;
    font-size: 0.9em;
    ${mediaQuery.minDesktop} {
      font-size: 1em;
    }
    .sub-title {
      margin-bottom: 0.7em;
    }
    .title {
      font-size: 0.5em;
      text-transform: capitalize;
      ${({ theme }) => theme.colors.white}
    }
  }
`;

const WrapperHomeBanner = styled.div`
  width: 100%;
  height: 50vh;
  max-height: 17em;
  position: relative;
  ${mediaQuery.minDesktop} {
    height: 60vh;
    max-height: 35em;
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
