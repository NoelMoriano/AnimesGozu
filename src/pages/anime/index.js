import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, EpisodeList, Spinner } from "../../components";
import { Imalogo } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router";
import { useAnimes } from "../../providers/Animes";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { currentConfig } from "../../firebase";
import { isEmpty } from "lodash";

export const Anime = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();

  const [episodes, setEspisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { animes } = useAnimes();

  const anime = animes.find((anime) => anime.id === animeId);

  const onNavigateTo = (param) => navigate(param);

  useEffect(() => {
    window.scroll(0, 0);
    (async () => await fetchEpisodes())();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const url = `${currentConfig.animeServerApi}/episodes/${animeId}`;
      const response = await fetch(url);
      const result = await response.json();
      setEspisodes(result);
    } catch (error) {
      console.error("errorFetchEpisodes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner height="90vh" />;

  return (
    <Container>
      <WrapperHomeBanner bgBanner={anime?.animeCoverImage?.url}>
        <div className="banner-wrapper">
          <div className="gradient">
            <div className="content-banner">
              <div className="anime-gender">
                <img src={Imalogo} alt="Imalogo" />
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
      {isEmpty(episodes) ? (
        <div>
          <h1>No se encontraron episodios</h1>
        </div>
      ) : (
        <EpisodeList episodes={episodes} />
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
    background: #000 url(${({ bgBanner }) => bgBanner || "transparent"})
      no-repeat center center;
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
      background-image: linear-gradient(#00000003 0%, #070707 98%);

      .content-banner {
        width: 100%;
        height: 100%;
        padding: 2rem;
        display: flex;
        justify-content: end;
        align-items: start;
        text-align: left;
        flex-direction: column;
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
          p {
            font-weight: 300;
            font-size: 0.9em;
            width: auto;
            height: auto;
            line-height: 1.1rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            -ms-box-orient: vertical;
            box-orient: vertical;
            -webkit-line-clamp: 11;
            -moz-line-clamp: 11;
            -ms-line-clamp: 11;
            line-clamp: 11;
            overflow: hidden;
          }
        }
      }
    }
  }
`;
