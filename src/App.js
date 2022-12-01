import React, { useEffect } from "react";
import { Router } from "./router";
import { yup } from "./config";
import { setLocale } from "yup";
import {
  AuthenticationProvider,
  GlobalDataProvider,
  HelmetConfigProvider,
  VersionProvider,
} from "./providers";
import ReactGA from "react-ga4";

const App = () => {
  useEffect(() => {
    setLocale(yup["es"]);
  }, []);

  useEffect(() => {
    ReactGA.send(window.location.pathname + window.location.search);
  }, [window.location.pathname]);

  return (
    <VersionProvider>
      <HelmetConfigProvider>
        <AuthenticationProvider>
          <GlobalDataProvider>
            <Router />
          </GlobalDataProvider>
        </AuthenticationProvider>
      </HelmetConfigProvider>
    </VersionProvider>
  );
};

export default App;
