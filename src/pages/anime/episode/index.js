import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

export const Episode = () => {
  const { animeId, episodeId } = useParams();

  console.log("IDs->", animeId, " => ", episodeId);

  return (
    <Container>
      <h1>EPISODES</h1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.font1};
`;
