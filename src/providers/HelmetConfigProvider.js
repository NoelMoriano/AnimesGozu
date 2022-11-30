import React, { createContext, useContext, useState } from "react";
import { Helmet } from "react-helmet";

const defaultConfig = {
  title: "AnimesGozu - Disfruta de los animes más gozus",
  description:
    "Disfruta de los animes y series mas gozus, como Chainsaw man, My Hero Academia, Dragon Ball Super, Attack on Titan, Naruto Shippuden, One Piece y más.",
  url: "https://animesgozu.com",
  image:
    "https://storage.googleapis.com/animes-362103.appspot.com/resources/banner.webp",
};

const HelmetConfigContext = createContext({
  onSetHelmetConfig: () => defaultConfig,
});

export const HelmetConfigProvider = ({ children }) => {
  const [configHelmet, setConfigHelmet] = useState(defaultConfig);

  const onSetHelmetConfig = (config) => setConfigHelmet(config);

  return (
    <HelmetConfigContext.Provider
      value={{
        onSetHelmetConfig,
      }}
    >
      <Helmet>
        <title data-react-helmet="true">{configHelmet.title}</title>
        <meta property="og:type" content="website" />
        <meta
          data-react-helmet="true"
          name="description"
          content={configHelmet.description}
        />

        <meta property="og:title" content={configHelmet.title} />
        <meta property="og:site_name" content="https://animesgozu.com" />
        <meta
          property="og:description"
          content={configHelmet.description}
          data-react-helmet="true"
        />
        <meta
          property="og:url"
          content={configHelmet.url}
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content={configHelmet.image}
          data-react-helmet="true"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:locale" content="es_ES" data-react-helmet="true" />
        <meta
          property="og:image:user_generated"
          content="false"
          data-react-helmet="true"
        />
        <meta
          property="og:image:width"
          content="640"
          data-react-helmet="true"
        />
      </Helmet>
      {children}
    </HelmetConfigContext.Provider>
  );
};

export const useHelmetConfig = () => useContext(HelmetConfigContext);
