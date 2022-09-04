import React from "react";
import styled from "styled-components";
import { CardAnime } from "../../components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useNavigate } from "react-router";
import { useAnimes } from "../../providers";
import { videoBanner } from "../../images";
import { capitalize, orderBy } from "lodash";

export const Home = () => {
  const navigate = useNavigate();

  const { animes } = useAnimes();

  const onNavigateTo = (param) => navigate(param);

  const orderAnimes = (animes) =>
    orderBy(animes, (anime) => capitalize(anime.name), ["asc"]);

  const animesCategory = orderAnimes(
    animes.filter((anime) => anime.category === "anime")
  );
  const ovasCategory = orderAnimes(
    animes.filter((anime) => anime.category === "ova")
  );

  return (
    <Container>
      <WrapperHomeBanner>
        <div className="banner-wrapper">
          <video src={videoBanner} autoPlay loop muted type="video/mp4" />
          <div className="gradient">
            <div className="description-banner">
              <div className="description">
                <h1>BIENVENIDO</h1>
                <h3>Tenemos los mejores animes para ti</h3>
              </div>
            </div>
          </div>
        </div>
      </WrapperHomeBanner>

      <WrapperAnimesContent>
        <div className="category-card">
          <h3>ANIMES:</h3>
          <div className="category">
            {animesCategory.map((anime, index) => (
              <CardAnime
                key={index}
                onNavigateAnime={() => onNavigateTo(`/anime/${anime.id}`)}
                title={anime.name}
                image={anime.animePicture.url}
                synopsis={anime.synopsis}
              />
            ))}
          </div>
        </div>
        <div className="category-card">
          <h3>OVAS:</h3>
          <div className="category ">
            {ovasCategory.map((anime, index) => (
              <CardAnime
                key={index}
                onNavigateAnime={() => onNavigateTo(`/anime/${anime.id}`)}
                title={anime.name}
                image={anime.animePicture.url}
                synopsis={anime.synopsis}
              />
            ))}
          </div>
        </div>
      </WrapperAnimesContent>
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
  .banner-wrapper {
    z-index: 3;
    width: 100%;
    height: 40vh;
    max-height: 50em;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    ${mediaQuery.minTablet} {
      height: 64vh;
    }

    video {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      background: #232a34;
    }

    .gradient {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 500;
      background: linear-gradient(#070707, rgb(29 29 29 / 26%), #070707);
      .description-banner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%;
        z-index: 700;

        .description {
          font-size: 0.7em;
          padding: 0 3em;
          ${mediaQuery.minTablet} {
            font-size: 1.2em;
          }
          h2 {
            margin-top: 0.3em;
          }
        }
      }
    }
  }
`;

const WrapperAnimesContent = styled.div`
  width: 100%;
  height: auto;
  padding: 2em 1.7em;
  position: relative;
  .category-card {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 3em;
    ${mediaQuery.minTablet} {
      margin-bottom: 5em;
    }
    h3 {
      margin: 1rem 1.2rem 2.6rem 0;
      ${mediaQuery.minTablet} {
        margin: 1em 1.2em 1em 0;
      }
    }
    .category {
      display: grid;
      justify-content: center;
      gap: 2em;
      grid-template-columns: repeat(auto-fit, minmax(9em, auto));
      ${mediaQuery.minMobile} {
        justify-content: start;
        grid-template-columns: repeat(auto-fit, minmax(11em, auto));
      }
    }
  }
`;
