import React from "react";
import styled from "styled-components";
import { EpisodeItem } from "./EpisodeItem";

export const EpisodeList = ({ episodes = [] }) => (
  <Container>
    <h2>Lista de episodios</h2>
    {episodes.map((episode, index) => (
      <EpisodeItem
        key={index}
        title={episodes.title}
        number={episode.number}
        image={episode.image}
      />
    ))}
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 1rem 0;
  padding: 1rem;
  position: relative;
  background: ${({ theme }) => theme.colors.tertiary};
  transition: all 0.2s ease-in-out;

  h2 {
    margin-bottom: 1rem;
  }
`;
