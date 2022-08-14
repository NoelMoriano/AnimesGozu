import React, { useEffect, useState } from "react";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/themes/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { yup } from "./config";
import { setLocale } from "yup";
import { theme } from "./styles";
import { animeServerApi } from "./firebase";
import { Spinner } from "./components";

export const App = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    animesFetch();
    setLocale(yup["es"]);
  }, []);

  const animesFetch = async () => {
    try {
      const response = await fetch(`${animeServerApi}/animes`);
      const result = await response.json();
      setAnimes(result);

      console.log("data->", result);
    } catch (error) {
      console.log("error->", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner height="90vh" />;

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router animes={animes} />
      </ThemeProvider>
    </BrowserRouter>
  );
};
