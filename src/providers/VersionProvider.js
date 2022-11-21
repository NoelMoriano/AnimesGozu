import React, { createContext, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore, version } from "../firebase";
import { Button, Result } from "../components";
import styled from "styled-components";
import { spinLoaderFixed } from "../utils/loader";

const VersionContext = createContext({
  version: "",
});

export const VersionProvider = ({ children }) => {
  const [settingDefault, settingDefaultLoading, settingDefaultError] =
    useDocumentData(firestore.collection("settings").doc("default"));

  const onClickRefresh = () => document.location.reload();

  if (settingDefaultLoading) return spinLoaderFixed();

  if (settingDefaultError)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Perdón, algo salió mal."
        extra={
          <Button onClick={onClickRefresh} type="primary">
            Actualizar
          </Button>
        }
      />
    );

  const isLastVersion = version === settingDefault?.version;

  return (
    <VersionContext.Provider
      value={{
        version,
      }}
    >
      {isLastVersion ? children : <Version />}
    </VersionContext.Provider>
  );
};

export const useVersion = () => useContext(VersionContext);

export const Version = () => (
  <VersionContainer>
    <div>
      <h4>
        Actualice para obtener la última versión de la aplicación.
        <br />
      </h4>
      <Button
        type="primary"
        size="medium"
        onClick={() => document.location.reload()}
      >
        Actualizar
      </Button>
    </div>
  </VersionContainer>
);

export const VersionContainer = styled.section`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  div {
    h2 {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
