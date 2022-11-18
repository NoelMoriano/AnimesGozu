import React from "react";
import styled from "styled-components";
import { ImgAnime } from "../../images";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const CardAnime = ({
  onNavigateAnime,
  title = "no found",
  image,
  imgAnime = ImgAnime,
  synopsis = "no found",
}) => (
  <Container onClick={() => onNavigateAnime()}>
    <div className="item-anime">
      <img
        loading="lazy"
        src={image || imgAnime}
        alt={`${title} animes gozu`}
      />
      <div className="hover-effect">
        <div className="synopsis">{synopsis}</div>
      </div>
    </div>
    <h5 className="title-anime">{title}</h5>
  </Container>
);

const Container = styled.div`
  max-width: 250px;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.5s cubic-bezier(0.34, 1.61, 0.7, 1);

  &:active {
    transform: scale(1.1);
  }

  ${mediaQuery.minMobile} {
    &:hover {
      transform: scale(1.1);
    }
  }

  .item-anime {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform ease-in-out 0.5s;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
      border: 1px solid rgba(238, 238, 238, 0.18);
    }

    .hover-effect {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateY(100%);
      transition: transform ease-in-out 0.5s;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      opacity: 0;
      padding: 0.7em;
      color: ${({ theme }) => theme.colors.font1};

      .synopsis {
        font-size: small;
        width: auto;
        height: auto;
        line-height: 1rem;
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

    ${mediaQuery.minMobile} {
      &:hover {
        transition: transform ease-in-out 0.5s;

        .hover-effect {
          opacity: 5;
          background: rgb(0, 0, 0);
          background: linear-gradient(
            2deg,
            rgba(0, 0, 0, 1) 0%,
            rgb(25 25 42 / 57%) 66%,
            rgba(0, 0, 0, 0) 90%
          );
          transform: translateY(0%);
        }
      }
    }
  }

  .title-anime {
    margin: 1em auto;
    text-align: center;
    text-transform: capitalize;
  }
`;
