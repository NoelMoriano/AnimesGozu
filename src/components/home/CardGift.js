import React from "react";
import styled from "styled-components";

export const CardGift = ({ gift }) => (
  <Container>
    <img
      loading="lazy"
      src={
        gift.images.preview_webp.url ||
        "https://media4.giphy.com/media/3o6wrvdHFbwBrUFenu/giphy.gif"
      }
      alt="gift"
    />
  </Container>
);

const Container = styled.div`
  img {
    width: 100%;
    height: auto;
    margin: 0;
  }
`;
