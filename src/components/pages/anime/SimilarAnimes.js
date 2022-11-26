import React from "react";
import { CardAnime } from "../../ui";
import styled from "styled-components";
import { capitalize, includes, orderBy } from "lodash";
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

  const similarAnimesView = orderBy(
    similarAnimes,
    (anime) => capitalize(anime.name),
    ["asc"]
  );

  return (
    <Container>
      <h5>Animes Similares:</h5>
      <div className="wrapper-categories">
        {similarAnimesView.map((similarAnime, index) => (
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
            fontSize="0.7em"
            showSynopsis={false}
          />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 1em;
  order: 5;
  h5 {
    margin: 2em 0 1.2em 0;
  }
  .wrapper-categories {
    display: grid;
    justify-content: center;
    gap: 1.5em;
    grid-template-columns: repeat(auto-fit, minmax(5em, auto));

    ${mediaQuery.minMobile} {
      justify-content: start;
      grid-template-columns: repeat(auto-fit, minmax(5em, auto));
    }
  }
`;
