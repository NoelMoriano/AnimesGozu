import styled, { css } from "styled-components";
import { faFilter, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, CardAnimeSecondary, Select } from "../../components";

export const SearchResult = () => {
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index, array) => (
          <CardAnimeSecondary key={index} />
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
      display: flex;
      gap: 1.2rem;
      flex-wrap: wrap;
    }
  `}
`;
