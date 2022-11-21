import React from "react";
import styled from "styled-components";
import { Button } from "../ui";
import { useAuthentication } from "../../providers";
import { useNavigate } from "react-router";
import { UserMenu } from "./UserMenu";

export const Drawer = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthentication();

  const onNavigateTo = (param) => navigate(param);

  return (
    <Container>
      <ComponentLogout
        authUser={authUser}
        logout={logout}
        onNavigateTo={onNavigateTo}
      />
    </Container>
  );
};

const ComponentLogout = ({ authUser, logout, onNavigateTo }) => (
  <>
    {authUser ? (
      <UserMenu onLogout={logout} />
    ) : (
      <div className="wrapper-no-auth-user">
        <div className="wrapper-buttons">
          <br />
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
        <div className="wrapper-messaje">
          <p>
            Al registrarte podrás solicitar tus animes favoritos y nosotros te
            lo enlistamos. Para nosotros es super importante su comodidad al
            usar nuestra plataforma, te agradeceremos mucho tus sugerencias para
            mejorar la plataforma ^^
          </p>
        </div>
      </div>
    )}
  </>
);
const Container = styled.div`
  width: 100%;
  height: auto;
  position: sticky;
  top: 90px;
  .wrapper-no-auth-user {
    padding: 0 1em;
    .wrapper-buttons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .wrapper-messaje {
      text-align: center;
      margin-top: 1em;
    }
  }
`;
