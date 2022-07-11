import React from "react";
import styled from "styled-components";
import { CardAnime } from "../../components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  const navigateAnime = (url) => navigate(url);

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
          <h2>Acción:</h2>
          <div className="category">
            <CardAnime onNavigateAnime={navigateAnime} />
            <CardAnime onNavigateAnime={navigateAnime} />
            <CardAnime onNavigateAnime={navigateAnime} />
            <CardAnime onNavigateAnime={navigateAnime} />
          </div>
        </div>
        <div className="category-card">
          <h2>Aventura:</h2>
          <div className="category">
            <CardAnime onNavigateAnime={navigateAnime} />
            <CardAnime onNavigateAnime={navigateAnime} />
            <CardAnime onNavigateAnime={navigateAnime} />
            <CardAnime onNavigateAnime={navigateAnime} />
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

const WrapperAnimesContent = styled.div`
  width: 100%;
  height: auto;
  padding-top: 2em;
  overflow: hidden;
  position: relative;
  .category-card {
    position: relative;
    height: auto;
    min-height: 430px;
    margin-bottom: 3rem;
    ${mediaQuery.minTablet} {
      min-height: 315px;
      margin: 1.5rem 0;
    }
    h2 {
      margin: 0 1.2rem 1.2rem 1.2rem;
    }
    .category {
      display: flex;
      position: absolute;
      overflow-x: auto;
      max-width: 100%;
      left: 0;
      //transform: translate3d(-1327px, 0px, 0px);
      transition: all 0.25s ease 0s;
      touch-action: manipulation;
    }
  }
`;
