import React from "react";
import styled from "styled-components";

export const SearchGift = ({ onSetSearch }) => {
  return (
    <Container>
      <input
        type="text"
        className="item-search"
        onChange={(e) => onSetSearch(e.target.value)}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .item-search {
    padding: 1rem;
    font-size: 1.7rem;
    border-radius: 7rem;
    width: 70%;
  }
`;
