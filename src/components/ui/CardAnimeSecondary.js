import styled from "styled-components";
import { capitalize } from "lodash";

export const CardAnimeSecondary = ({ title, image }) => {
  return (
    <Container>
      <img src={image} alt={title} />
      <h3>{capitalize(title)}</h3>
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
    width: 12em;
    border-radius: 0.5em;
    z-index: -10;
  }
  h3 {
    padding-top: 1em;
    text-align: center;
    font-size: 1em;
  }
`;
