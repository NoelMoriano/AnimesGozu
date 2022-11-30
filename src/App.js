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

const App = () => {
  useEffect(() => {
    setLocale(yup["es"]);
  }, []);

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
