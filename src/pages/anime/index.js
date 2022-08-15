import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../components";
import { Imalogo } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { useAnimes } from "../../providers/Animes";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const Anime = () => {
  const { animeId } = useParams();

  const { animes } = useAnimes();

  const anime = animes.find((anime) => anime.id === animeId);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Container>
      <WrapperHomeBanner bgBanner={anime.animeCoverImage.url}>
        <div className="banner-wrapper">
          <div className="gradient">
            <div className="content-banner">
              <div className="anime-gender">
                <img src={Imalogo} alt="Imalogo" />
                <span>SERIE</span>
              </div>
              <div className="anime-title">
                <h1>{anime.name.toUpperCase()}</h1>
              </div>
              <div className="synopsis-anime">
                <p>{anime.synopsis}</p>
              </div>
              <div className="content-button">
                <Button size="medium" borderRadius="7rem">
                  <FontAwesomeIcon icon={faPlay} size="lg" /> &nbsp; REPRODUCIR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </WrapperHomeBanner>
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
            width: 100%;
            max-width: 40em;
            max-height: 7rem;
            font-weight: 300;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
`;
