import React from "react";
import styled from "styled-components";

export const Result = ({
  status = 500,
  title = "500",
  subTitle = "Perdón, algo salió mal.",
  extra,
}) => {
  return (
    <Container>
      <ul>
        <li>
          <h2>{title}</h2>
        </li>
        <li>
          <h3>{subTitle}</h3>
        </li>
        {extra && <li>{extra}</li>}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    width: auto;
    li {
      display: block;
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
