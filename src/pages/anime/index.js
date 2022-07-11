import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

export const Anime = () => {
  const { animeId } = useParams();

  console.log("animeId->", animeId);

  return (
    <Container>
      <WrapperHomeBanner>
        <div className="banner-wrapper">
          <div className="gradient">
            <div className="banner">
              <h1>ANIME FOREVER</h1>
              <h2>Tenemos todo tipos de animes para todo tipo de gustos</h2>
            </div>
          </div>
        </div>
      </WrapperHomeBanner>
      <WrapperEpisodesContent>
        <h1>Capitulos</h1>
      </WrapperEpisodesContent>
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
    background: #000
      url(https://noelmoriano.github.io/AnimeGozu//images/home/banner/image1.png)
      no-repeat;
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

      .banner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;

        h2 {
          margin: 2% 10%;
        }
      }
    }
  }
`;

const WrapperEpisodesContent = styled.div`
  width: 100%;
  height: auto;
  padding-top: 2em;
  overflow: hidden;
  position: relative;
`;
