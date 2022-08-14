import styled, { css } from "styled-components";
import { faFilter, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, CardAnimeSecondary, Select } from "../../components";
import { useAnimes } from "../../providers/Animes";
import { useNavigate } from "react-router";

export const SearchResult = () => {
  const navigate = useNavigate();
  const { animes } = useAnimes();
  const navigateAnime = (animeId) => navigate(`/${animeId}`);

  console.log(animes);
  return (
    <Container>
      <h1>
        <FontAwesomeIcon icon={faList} className="item-icon" />
        Lista de Animes
      </h1>
      <div className="section-select">
        <Select title="Genero: Todos" />
        <Select title="Tipo: Todos" />
        <Select title="Orden: Por defecto" />
        <Select title="Año: Todos" />
        <Button type="primary" size="small" borderRadius=".5em">
          <FontAwesomeIcon icon={faFilter} className="item-icon" />
          Filtrar
        </Button>
      </div>
      <div className="section-anime">
        {animes.map((anime, index, array) => (
          <CardAnimeSecondary
            key={index}
            onNavigateAnime={() => navigateAnime(anime.id)}
            title={anime.name}
            image={anime.animePicture.url}
          />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.main`
  ${({ theme }) => css`
    color: ${theme.colors.font2};
    padding: ${theme.paddings.x_large};
    h1 {
      font-size: ${theme.font_sizes.xx_large};
      text-transform: uppercase;
      font-weight: bold;
      .item-icon {
        padding-right: ${theme.paddings.x_small};
      }
    }
    .section-select {
      padding: 2rem 1rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;
    }
    .section-anime {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
      gap: 1rem;
      margin: auto;
      text-align: center;
    }
  `}
`;
