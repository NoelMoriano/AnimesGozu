import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SeasonList = ({ title, icon }) => {
  return (
    <Container>
      <h3>{title}</h3>
      <FontAwesomeIcon className="icon-search" icon={icon} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 3rem;
  background: #0e0e0e;
  margin: 1em 2em;
  &&:hover {
    cursor: pointer;
  }
  h3 {
    font-size: 1.3rem;
  }
`;
