import React, { createContext, useContext, useEffect, useState } from "react";
import { animeServerApi } from "../firebase";
import { Spinner } from "../components";

export const AnimesContext = createContext({ animes: [] });

export const AnimesProvider = ({ children }) => {
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

  if (loading) return <Spinner height="90vh" />;

  return (
    <AnimesContext.Provider value={{ animes: animes }}>
      {children}
    </AnimesContext.Provider>
  );
};

export const useAnimes = () => useContext(AnimesContext);
