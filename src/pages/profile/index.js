import React from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router";
import styled from "styled-components";

export const Profile = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/");

  return (
    <Container>
      <div className="wrapper-items">
        <h1>Page en construcción</h1>
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
  }
`;
