import React from "react";
import styled from "styled-components";
import { ImgHomeBanner } from "../../images";
import { CardAnime } from "../../components";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const Home = () => (
  <Container>
    <WrapperHomeBanner>
      <img src={ImgHomeBanner} alt="Banner AnimeGozu" className="home-banner" />
    </WrapperHomeBanner>

    <WrapperAnimesContent>
      <div className="category-card">
        <h2>Acción:</h2>
        <div className="category">
          <CardAnime />
          <CardAnime />
          <CardAnime />
          <CardAnime />
        </div>
      </div>
      <div className="category-card">
        <h2>Aventura:</h2>
        <div className="category">
          <CardAnime />
          <CardAnime />
          <CardAnime />
          <CardAnime />
        </div>
      </div>
    </WrapperAnimesContent>
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
  .home-banner {
    width: 100%;
    height: 100%;
  }
`;

const WrapperHomeBanner = styled.div`
  width: 100%;
  height: 70vh;
  max-height: 40em;
  .home-banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    }
  }
`;
