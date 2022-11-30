import React, { createContext, useContext, useEffect, useState } from "react";
import { animeServerApi } from "../firebase/index";
import { spinLoaderFixed } from "../utils/loader";

const GlobalDataContext = createContext({ animes: [] });

export const GlobalDataProvider = ({ children }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await animesFetch();
    })();
  }, []);

  const animesFetch = async () => {
    try {
      const response = await fetch(`${animeServerApi}/animes`);
      if (!response.ok) throw new Error("Error fetch animes");

      const result = await response.json();

      setAnimes(result || []);
    } catch (error) {
      console.log("Error fetch animes: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return spinLoaderFixed();

  return (
    <GlobalDataContext.Provider value={{ animes }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useAnimes = () => useContext(GlobalDataContext);
