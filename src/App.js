import React, { useEffect } from "react";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { yup } from "./config";
import { setLocale } from "yup";
import { theme } from "./styles";
import { AnimesProvider } from "./providers/Animes";
import { AuthenticationProvider } from "./providers/Authentication";

export const App = () => {
  useEffect(() => {
    setLocale(yup["es"]);
  }, []);

  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <AnimesProvider>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </AnimesProvider>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};
