import React from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router";
import styled from "styled-components";

export const Page404 = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/");

  return (
    <Container>
      <div className="wrapper-items">
        <h1>404</h1>
        <p>No se encontró la página</p>
        <Button onClick={goBack} margin="1em 0">
          Regresar a inicio
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper-items {
    color: ${({ theme }) => theme.colors.font1};
    text-align: center;
    h1 {
      font-size: 11em;
    }
    p {
      font-size: 1.4em;
    }
  }
`;
