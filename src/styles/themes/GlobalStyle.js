import { css, createGlobalStyle } from "styled-components";
import { mediaQuery } from "../constants/mediaQuery";

const global = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.font1};
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-size: 16px;
    overflow-x: hidden;
    font-family: "MontserratRegular", sans-serif;
    background: ${({ theme }) => theme.colors.secondary};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "MontserratRegular", sans-serif;
    color: ${({ theme }) => theme.colors.font1};
  }

  h1 {
    font-size: 3em;
    font-weight: bold;
  }

  h2 {
    font-size: 2.3em;
    font-weight: bold;

    ${mediaQuery.minTablet} {
      font-size: 2.2em;
    }
  }

  h3 {
    font-size: 2em;
    font-weight: bold;
  }

  h4 {
    font-size: 1.2em;
    font-weight: bold;
  }

  h5 {
    font-size: 1.1em;
    font-weight: bold;
  }

  h5 {
    font-size: 1em;
    font-weight: bold;
  }

  h1,
  h2,
  h3 {
    line-height: 2.7em;
  }

  .item-link {
    color: ${({ theme }) => theme.colors.quinary};
    cursor: pointer;
    text-decoration: none;
  }
`;

export const GlobalStyles = createGlobalStyle(global);
