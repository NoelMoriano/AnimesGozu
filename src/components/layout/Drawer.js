import React from "react";
import styled from "styled-components";
import {Button} from "../ui";
import {useAuthentication} from "../../providers";
import {useNavigate} from "react-router";
import {UserMenu} from "./UserMenu";

export const Drawer = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthentication();

  const onNavigateTo = (param) => navigate(param);

  return (<Container>
        <ComponentLogout
          authUser={authUser}
          logout={logout}
          onNavigateTo={onNavigateTo}
        />
    </Container>
  );
};

const ComponentLogout = ({ authUser, logout, onNavigateTo }) => {
  return (
    <>
      {authUser ? (
        <UserMenu onLogout={logout} />
      ) : (
        <div className="wrapper-buttons">
          <br/>
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
    </>
  );
};
const Container = styled.div`
  position: sticky;
  top: 57px;
  .wrapper-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
