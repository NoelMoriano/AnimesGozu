import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/fonts/index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { GlobalStyle, theme } from "./styles";
import { BrowserRouter } from "react-router-dom";
import { ScrollTop } from "./ScrollTop";
import { ThemeProvider } from "styled-components";
import { GoogleAnalyticsProvider } from "./providers";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleAnalyticsProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollTop>
          <App />
        </ScrollTop>
      </BrowserRouter>
    </ThemeProvider>
  </GoogleAnalyticsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
