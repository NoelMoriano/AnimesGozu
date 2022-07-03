import React from "react";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/themes/GlobalStyle";

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
};
