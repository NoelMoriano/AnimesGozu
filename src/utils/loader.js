import React from "react";
import styled from "styled-components";
import { SpinnerLogo } from "../images";

export const spinLoader = (message) => {
  return (
    <ContainerSpinLoader type="relative">
      <img src={SpinnerLogo} className="spin-version-icon" />
    </ContainerSpinLoader>
  );
};

export const spinLoaderFixed = () => {
  return (
    <ContainerSpinLoader type="fixed">
      <img src={SpinnerLogo} className="spin-version-icon" />
    </ContainerSpinLoader>
  );
};

const ContainerSpinLoader = styled.div`
  width: ${({ type }) => (type === "fixed" ? "100%" : "100vw")};
  height: ${({ type }) => (type === "fixed" ? "100%" : "100vw")};
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
