import React from "react";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { yup } from "./config";
import { setLocale } from "yup";
import { theme } from "./styles";

export const App = () => {
  setLocale(yup["es"]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
};
