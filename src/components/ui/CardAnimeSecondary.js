import styled from "styled-components";
import { ImgCardOnePiece } from "../../images";

export const CardAnimeSecondary = ({ title, image }) => {
  return (
    <Container>
      <img src={image} alt={title} />
      <h2>{title}</h2>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1.3rem;
  cursor: pointer;
  &:hover {
    &:after {
      content: "";
      left: 5px;
      top: 5px;
      border-radius: 5px;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      background-color: rgba(1, 188, 243, 0.5);
      z-index: 2;
    }
  }

  img {
    width: 12rem;
    border-radius: 0.5rem;
    z-index: -10;
  }
  h2 {
    padding-top: 1rem;
    text-align: center;
  }
`;
