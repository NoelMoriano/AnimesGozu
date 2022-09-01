import React from "react";
import styled from "styled-components";
import { Button } from "../ui";
import { useAuthentication } from "../../providers/Authentication";
import { useNavigate } from "react-router";
import { UserMenu } from "./UserMenu";

export const Drawer = () => {
  const navigate = useNavigate();

  const { authUser, logout } = useAuthentication();

  const onNavigateTo = (param) => navigate(param);

  return (
    <Container>
      {authUser ? (
        <UserMenu authUser={authUser} onLogout={logout} />
      ) : (
        <div className="wrapper-buttons">
          <Button size="medium" onClick={() => onNavigateTo("/login")}>
            Iniciar sesion
          </Button>
          <Button
            size="medium"
            type="tertiary"
            onClick={() => onNavigateTo("/register")}
          >
            Registrarse
          </Button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  position: sticky;
  top: 10vh;
  .wrapper-buttons {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
