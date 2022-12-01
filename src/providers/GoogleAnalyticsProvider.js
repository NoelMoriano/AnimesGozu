import React, { createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { currentConfig } from "../firebase";
import ReactGA from "react-ga4";

export const GoogleAnalyticsContext = createContext({
  gaClientId: "",
});

export const GoogleAnalyticsProvider = ({ children }) => {
  const gaClientId = getGaClientId();

  ReactGA.initialize(currentConfig?.firebaseApp?.measurementId || "-", {
    titleCase: false,
    gaOptions: { clientId: gaClientId },
  });

  useEffect(() => {
    ReactGA.send(window.location.pathname + window.location.search);
  }, []);

  return (
    <GoogleAnalyticsContext.Provider value={{ gaClientId }}>
      {children}
    </GoogleAnalyticsContext.Provider>
  );
};

export const useGoogleAnalytics = () => useContext(GoogleAnalyticsContext);

const getGaClientId = () => {
  const storageKey = "gaClientId";

  const gaClientIdFromStorage = localStorage.getItem(storageKey);

  if (gaClientIdFromStorage) return gaClientIdFromStorage;

  const newGaClientId = uuidv4();

  localStorage.setItem(storageKey, newGaClientId);

  return newGaClientId;
};
