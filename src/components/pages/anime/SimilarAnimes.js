import React from "react";
import { CardAnime } from "../../ui";
import styled from "styled-components";
import { includes } from "lodash";
import { useNavigate } from "react-router";
import { mediaQuery } from "../../../styles/constants/mediaQuery";

export const SimilarAnimes = ({ anime = null, animes = [], onScrollTop }) => {
  const navigate = useNavigate();

  const onNavigateTo = (param) => navigate(param);

  const similarAnimes = animes
    .filter((anime_) =>
      anime.gender.filter((gender) => includes(anime_.gender_, gender))
    )
    .filter((anime_) => anime_.nameId !== anime.nameId);

  return (
    <Container>
      <h4>Animes Similares:</h4>
      <div className="wrapper-categories">
        {similarAnimes.map((similarAnime, index) => (
          <CardAnime
            key={index}
            onNavigateAnime={() => {
              onNavigateTo(`/ver/${similarAnime.nameId}/1`);
              onScrollTop();
            }}
            title={similarAnime.name}
            image={similarAnime.animePicture.url}
            synopsis={similarAnime.synopsis}
            maxWidth="150px"
            fontSize="0.8em"
          />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 1em;
  order: 5;
  h4 {
    margin: 1.5em 0;
  }
  .wrapper-categories {
    display: grid;
    justify-content: center;
    gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(5em, auto));

    ${mediaQuery.minMobile} {
      justify-content: start;
      grid-template-columns: repeat(auto-fit, minmax(5em, auto));
    }
  }
`;
