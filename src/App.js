import React, { useEffect } from "react";
import { Router } from "./router";
import { yup } from "./config";
import { setLocale } from "yup";
import {
  AuthenticationProvider,
  GlobalDataProvider,
  VersionProvider,
} from "./providers";

const App = () => {
  useEffect(() => {
    setLocale(yup["es"]);
  }, []);

  return (
    <VersionProvider>
      <AuthenticationProvider>
        <GlobalDataProvider>
          <Router />
        </GlobalDataProvider>
      </AuthenticationProvider>
    </VersionProvider>
  );
};

export default App;
