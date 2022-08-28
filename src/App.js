import React, { useEffect } from "react";
import { auth } from "./firebase";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { yup } from "./config";
import { setLocale } from "yup";
import { theme } from "./styles";
import { AnimesProvider } from "./providers/Animes";
import {
  AuthenticationProvider,
  useAuthentication,
} from "./providers/Authentication";

export const App = () => {
  const { authUser, existsAuthUser } = useAuthentication();

  const onSingUp = async () => {
    await auth.signOut();
  };

  console.log("existsAuthUser->", existsAuthUser);

  useEffect(() => {
    setLocale(yup["es"]);
  }, []);

  useEffect(() => {
    if (authUser) {
      alert("INICIO SESION CON EXITO!");
    }

    onSingUp();
  }, []);

  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <AnimesProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router />
          </ThemeProvider>
        </AnimesProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
};
