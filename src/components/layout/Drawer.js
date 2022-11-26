import React from "react";
import styled from "styled-components";
import { Button } from "../ui";
import { useAuthentication } from "../../providers";
import { useNavigate } from "react-router";
import { UserMenu } from "./UserMenu";
import { AdblockLogo } from "../../images";

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
      <div className="wrapper-auth-user">
        <UserMenu onLogout={logout} />
        <div className="wrapper-item adblock-item">
          <a href="https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb?hl=en-US">
            <p>
              Para una mejor experiencia, se recomienda usar un bloqueador de
              anuncios como (AdBlock)
            </p>
            <img src={AdblockLogo} alt="AnimesGozu - adblock" />
          </a>
        </div>
      </div>
    ) : (
      <div className="wrapper-no-auth-user">
        <div className="wrapper-item buttons">
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
        <div className="wrapper-item message">
          <p>
            Al registrarte podrás solicitar tus animes favoritos y nosotros te
            lo enlistamos. Para nosotros es importante su comodidad al usar
            nuestra plataforma. Te agradeceremos mucho tus sugerencias para
            mejorar la plataforma.
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
  top: 57px;
  .wrapper-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .wrapper-auth-user,
  .wrapper-no-auth-user {
    min-height: calc(100vh - 57px);
    height: auto;
  }

  .wrapper-auth-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    .adblock-item {
      a {
        display: block;
        color: white;
        text-decoration: none;
        p {
          margin-bottom: 1em;
        }
        img {
          width: 3em;
          height: auto;
        }
      }
    }
  }
  .wrapper-no-auth-user {
    padding: 0 1em;
    .message {
      margin-top: 1em;
    }
  }
`;
