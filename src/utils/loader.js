import React from "react";
import styled from "styled-components";
import { SpinnerLogo } from "../images";

export const spinLoader = () => {
  return (
    <ContainerSpinLoader type="relative">
      <img
        loading="lazy"
        src={SpinnerLogo}
        className="spin-version-icon"
        alt="animes gozu spinner"
      />
    </ContainerSpinLoader>
  );
};

export const spinLoaderFixed = () => {
  return (
    <ContainerSpinLoader type="fixed">
      <img
        loading="lazy"
        src={SpinnerLogo}
        className="spin-version-icon"
        alt="animes gozu spinner"
      />
    </ContainerSpinLoader>
  );
};

const ContainerSpinLoader = styled.div`
  width: ${({ type }) => (type === "fixed" ? "100%" : "100vw")};
  height: ${({ type }) => (type === "fixed" ? "100%" : "100vh")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${({ type }) => type};

  .spin-version-icon {
    width: 7em;
    height: auto;
    margin: auto;
    object-fit: contain;
  }
`;
