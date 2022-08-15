import React from "react";
import styled from "styled-components";
import { CardAnime } from "../../components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useNavigate } from "react-router";
import { useAnimes } from "../../providers/Animes";

export const Home = () => {
  const navigate = useNavigate();

  const { animes } = useAnimes();

  console.log("ObtenerListDeAnimes->", animes);

  const animesCategory = animes.filter((anime) => anime.category === "anime");
  const ovasCategory = animes.filter((anime) => anime.category === "ova");

  const navigateAnime = (animeId) => navigate(`/${animeId}`);

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

      <WrapperAnimesContent>
        <div className="category-card">
          <h2>ANIMES:</h2>
          <div className="category">
            {animesCategory.map((anime, index) => (
              <CardAnime
                key={index}
                onNavigateAnime={() => navigateAnime(anime.id)}
                title={anime.name}
                image={anime.animePicture.url}
                synopsis={anime.synopsis}
              />
            ))}
          </div>
        </div>
        <div className="category-card">
          <h2>OVAS:</h2>
          <div className="category">
            {ovasCategory.map((anime, index) => (
              <CardAnime
                key={index}
                onNavigateAnime={() => navigateAnime(anime.id)}
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
    width: 100%;
    height: 70vh;
    max-height: 40em;
    background: #000
      url(https://noelmoriano.github.io/AnimeGozu//images/home/banner/image1.png)
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

const WrapperAnimesContent = styled.div`
  width: 100%;
  height: auto;
  padding-top: 2em;
  position: relative;
  .category-card {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 3rem;
    ${mediaQuery.minTablet} {
      margin: 1.5rem 0;
    }
    h2 {
      margin: 1rem 1.2rem 2.6rem 1.2rem;
    }
    .category {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
      gap: 2.1rem;
      justify-content: space-around;
    }
  }
`;
