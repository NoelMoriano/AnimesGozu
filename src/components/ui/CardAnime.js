import React from "react";
import styled from "styled-components";
import { ImgAnime } from "../../images";
import { capitalize } from "lodash";

export const CardAnime = ({
  onNavigateAnime,
  title = "no found",
  image,
  imgAnime = ImgAnime,
  synopsis = "no found",
}) => (
  <Container onClick={() => onNavigateAnime()}>
    <div className="item-anime">
      <img src={image || imgAnime} alt={`${title} - AnimeGozu`} />
      <div className="hover-effect">
        <div className="synopsis">{synopsis}</div>
      </div>
    </div>
    <h4 className="title-anime">{capitalize(title)}</h4>
  </Container>
);

const Container = styled.div`
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.5s cubic-bezier(0.34, 1.61, 0.7, 1);

  &:hover {
    transform: scale(1.1);
  }

  .item-anime {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      -webkit-transition: transform ease-in-out 0.5s;
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
        word-break: break-all;
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

    &:hover {
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

  .title-anime {
    margin: 1em auto;
    text-align: center;
  }
`;
