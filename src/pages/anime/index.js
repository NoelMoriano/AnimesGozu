import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, EpisodeList, Spinner } from "../../components";
import { Imalogo } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router";
import { useAnimes, useHelmetConfig } from "../../providers";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { currentConfig } from "../../firebase/index";
import { capitalize, isEmpty } from "lodash";
import { keyframes } from "../../styles/constants/keyframes";
import { ScrollStyle } from "../../styles/constants/mixins";

export const Anime = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const { onSetHelmetConfig } = useHelmetConfig();

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { animes } = useAnimes();

  const anime = animes.find((anime) => anime.nameId === animeId);

  useEffect(() => {
    anime &&
      onSetHelmetConfig({
        title: `${capitalize(anime.name)} - Ver en AnimesGozu`,
        description: capitalize(anime.synopsis),
        url: `https://animesgozu.com/anime/${anime.nameId}`,
        image: anime.animePicture.thumbUrl,
      });
  }, [anime]);

  const onNavigateTo = (param) => navigate(param);
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    window.scroll(0, 0);
    if (!anime) return onGoBack();

    (async () => await fetchEpisodes())();
  }, [animeId]);

  const fetchEpisodes = async () => {
    try {
      const url = `${currentConfig.animeServerApi}/episodes/${animeId}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("no found anime");

      const result = await response.json();

      setEpisodes(result);
    } catch (error) {
      console.error("errorFetchEpisodes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner height="90vh" />;

  return (
    <Container>
      <WrapperHomeBanner>
        <div className="banner-wrapper">
          <img
            src={anime?.animeCoverImage?.url}
            alt="banner anime"
            className="banner-image"
          />
          <div className="gradient">
            <div className="content-banner">
              <div className="anime-gender">
                <img loading="lazy" src={Imalogo} alt="Imalogo animes gozu" />
                <span>{anime.category.toUpperCase()}</span>
              </div>
              <div className="anime-title">
                <h1>{anime.name.toUpperCase()}</h1>
              </div>
              <div className="synopsis-anime">
                <p>{anime.synopsis}</p>
              </div>
              {
                <div className="content-button">
                  <Button
                    animate
                    size="medium"
                    borderRadius="7rem"
                    onClick={() =>
                      isEmpty(episodes)
                        ? onNavigateTo(-1)
                        : onNavigateTo(`/ver/${animeId}/1`)
                    }
                  >
                    <FontAwesomeIcon
                      icon={isEmpty(episodes) ? faChevronLeft : faPlay}
                      size="lg"
                    />{" "}
                    &nbsp; {isEmpty(episodes) ? "REGRESAR" : "VER ANIME"}
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      </WrapperHomeBanner>
      <div className="wrapper-episodes">
        {isEmpty(episodes) ? (
          <h3>No se encontraron episodios</h3>
        ) : (
          <EpisodeList episodes={episodes} />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.font1};
  .wrapper-episodes {
    padding: 1.5em 0;
    text-align: center;
  }
`;

const WrapperHomeBanner = styled.div`
  width: 100%;
  height: 70vh;
  max-height: 40em;
  position: relative;
  overflow: hidden;
  .banner-wrapper {
    width: 100%;
    height: 70vh;
    max-height: 40em;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      animation: ${keyframes.zoomOutZoomIn} 15s ease infinite;
    }

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
      background-image: linear-gradient(#00000003 0%, #070707 98%);
      z-index: 100;

      .content-banner {
        width: 100%;
        height: 100%;
        padding: 1.3em;
        display: flex;
        justify-content: end;
        align-items: start;
        text-align: left;
        flex-direction: column;
        z-index: 200;
        .anime-gender {
          display: flex;
          justify-content: start;
          align-items: center;
          img {
            width: 1.7em;
            height: auto;
            object-fit: contain;
            margin-right: 0.4rem;
          }
        }
        .anime-title {
          margin: 0.3rem 0;
          h1 {
            font-size: 2.3em;
            font-weight: 900;
            ${mediaQuery.minTablet} {
              font-size: 3em;
            }
          }
        }
        .synopsis-anime {
          padding-bottom: 1rem;
          max-height: 17em;
          overflow: auto;
          ${ScrollStyle("3px")};
          p {
            font-weight: 400;
            font-size: 0.9em;
            width: auto;
            height: auto;
            line-height: 1.2rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            -ms-box-orient: vertical;
            box-orient: vertical;
            -webkit-line-clamp: 30;
            -moz-line-clamp: 30;
            -ms-line-clamp: 30;
            line-clamp: 30;
            overflow: hidden;
          }
        }
      }
    }
  }
`;
