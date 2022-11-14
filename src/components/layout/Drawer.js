import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, EpisodeListSecondary, Spinner } from "../ui";
import { useAuthentication } from "../../providers";
import { useNavigate, useParams } from "react-router";
import { UserMenu } from "./UserMenu";
import { currentConfig } from "../../firebase";

export const Drawer = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const { authUser, logout } = useAuthentication();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const onNavigateTo = (param) => navigate(param);

  const words = window.location.pathname.split("/");

  const isAnimePageView = !!words.find((word) => word === "ver");

  useEffect(() => {
    (async () => await fetchEpisodes())();
  }, [episodes]);

  const fetchEpisodes = async () => {
    try {
      const url = `${currentConfig.animeServerApi}/episodes/${animeId}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("no found anime");

      const result = await response.json();

      setEpisodes(result);
    } catch (error) {
      console.error("errorFetchEpisodes:", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      {isAnimePageView ? (
        <EpisodeListSecondary episodes={episodes} />
      ) : (
        <ComponentLogout
          authUser={authUser}
          logout={logout}
          onNavigateTo={onNavigateTo}
        />
      )}
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
  padding: 0.5rem 0;
  position: sticky;
  top: 1px;
  .wrapper-buttons {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
