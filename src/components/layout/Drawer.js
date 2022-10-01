import React, { useState } from "react";
import styled from "styled-components";
import { Button, FormAnimeRequest, Modal } from "../ui";
import { useAuthentication } from "../../providers";
import { useNavigate } from "react-router";
import { UserMenu } from "./UserMenu";

export const Drawer = () => {
  const navigate = useNavigate();
  const [isVisibleModalAnimeRequest, setIsVisibleModalAnimeRequest] =
    useState(false);

  const { authUser, logout } = useAuthentication();

  const onNavigateTo = (param) => navigate(param);

  return (
    <Container>
      {authUser ? (
        <UserMenu onLogout={logout} />
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
      <br />

      <div className="wrapper-buttons">
        <Button
          onClick={() => setIsVisibleModalAnimeRequest(true)}
          size="medium"
        >
          Solicitar mi anime
        </Button>
      </div>
      <Modal
        title={<h4>Solicitud de anime</h4>}
        visible={isVisibleModalAnimeRequest}
        onClose={() => setIsVisibleModalAnimeRequest(false)}
      >
        <FormAnimeRequest
          onCloseModal={() => setIsVisibleModalAnimeRequest(false)}
        />
      </Modal>
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
