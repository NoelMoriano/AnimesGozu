import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Button, EpisodeList } from "../../components";
import { Imalogo } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const episodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const Anime = () => {
  const { animeId } = useParams();

  console.log("animeId->", animeId);

  return (
    <Container>
      <WrapperHomeBanner bgBanner="https://firebasestorage.googleapis.com/v0/b/animes-dev.appspot.com/o/resources%2Fimage%201.jpg?alt=media&token=7836560d-1e2b-4682-92da-309c0b422241">
        <div className="banner-wrapper">
          <div className="gradient">
            <div className="content-banner">
              <div className="anime-gender">
                <img src={Imalogo} alt="Imalogo" />
                <span>SERIE</span>
              </div>
              <div className="anime-title">
                <h1> NARUTO SHIPPUDEN</h1>
              </div>
              <div className="synopsis-anime">
                <p>
                  'Naruto Shippuden' se trata de la segunda parte del anime
                  'Naruto' cuando Naruto regresa a La Aldea Oculta de la hoja
                  (Konoha), tras haber estado dos años y media entrenando con
                  uno de los tres legendarios ninja.
                </p>
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
      <EpisodeList episodes={episodes} />
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
            font-size: 3em;
            font-weight: 900;
          }
        }
        .synopsis-anime {
          padding-bottom: 1rem;
          p {
            width: 100%;
            max-width: 40em;
            font-weight: 300;
          }
        }
      }
    }
  }
`;
