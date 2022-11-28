import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EpisodeItem } from "./EpisodeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { useNavigate, useParams } from "react-router";
import { orderBy } from "lodash";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { ScrollStyle } from "../../styles/constants/mixins";
import { List } from "react-virtualized";

export const EpisodeList = ({ episodes = [] }) => {
  const { animeId } = useParams();
  const navigate = useNavigate();

  const [isAscEpisodes, setIsAscEpisodes] = useState(false);

  const onWindowScrollTop = () => window.scrollTo(0, 0);

  const onNavigateTo = (param) => navigate(param);

  const episodesView = () =>
    orderBy(episodes, ["episodeNumber"], [isAscEpisodes ? "asc" : "desc"]);

  useEffect(() => {
    episodesView();
  }, [isAscEpisodes]);

  // const rowRenderer = ({
  //   index, // Index of row
  //   isScrolling, // The List is currently being scrolled
  //   isVisible, // This row is visible within the List (eg it is not an overscanned row)
  //   key, // Unique key within array of rendered rows
  //   parent, // Reference to the parent List (instance)
  //   style, // Style object to be applied to row (to position it);
  //   // This must be passed through to the rendered row element.
  // }) => {
  //   const episode = episodesView()[index];
  //
  //   const content = (
  //     <EpisodeItem
  //       number={episode.episodeNumber || index + 1}
  //       title={episode.title || ""}
  //       image={
  //         episode.episodeImage.url ||
  //         "https://storage.googleapis.com/animesgozu-dev.appspot.com/resources/image-no-found.jpeg"
  //       }
  //       fontSize="12px"
  //       onClick={() => {
  //         onNavigateTo(`/ver/${animeId}/${episode.episodeNumber}`);
  //         onWindowScrollTop();
  //       }}
  //     />
  //   );
  //
  //   return (
  //     <div key={key} style={style}>
  //       {content}
  //     </div>
  //   );
  // };

  return (
    <Container>
      <WrapperHeader>
        <div className="item-title">
          <h4>Lista de episodios</h4>
        </div>
        <div className="item-filters">
          <ul>
            <li>
              <Button
                size="small"
                onClick={() => setIsAscEpisodes(!isAscEpisodes)}
              >
                Mayor o menor &nbsp;
                <FontAwesomeIcon
                  icon={
                    isAscEpisodes ? faArrowDownShortWide : faArrowUpShortWide
                  }
                  size="lg"
                />
              </Button>
            </li>
          </ul>
        </div>
      </WrapperHeader>
      <WrapperEpisodes>
        {episodesView().map((episode, index) => (
          <EpisodeItem
            key={index}
            title={episode.title || ""}
            number={episode.episodeNumber || index + 1}
            image={
              episode.episodeImage.url ||
              "https://storage.googleapis.com/animesgozu-dev.appspot.com/resources/image-no-found.jpeg"
            }
            onClick={() => {
              onNavigateTo(`/ver/${animeId}/${episode.episodeNumber}`);
              onWindowScrollTop();
            }}
          />
        ))}
        {/*<List*/}
        {/*  width={1000}*/}
        {/*  height={400}*/}
        {/*  rowCount={episodes.length}*/}
        {/*  rowHeight={50}*/}
        {/*  rowRenderer={rowRenderer}*/}
        {/*/>*/}
      </WrapperEpisodes>
    </Container>
  );
};

const Container = styled.div`
  width: 87%;
  height: auto;
  margin: auto;
  padding: 1em;
  position: relative;
  background: ${({ theme }) => theme.colors.tertiary};
  transition: all 0.2s ease-in-out;
  border-radius: 0.7rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

const WrapperEpisodes = styled.div`
  width: auto;
  height: auto;
  max-height: 30em;
  overflow-y: auto;

  ${ScrollStyle};
`;

const WrapperHeader = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  ${mediaQuery.minMobile} {
    grid-template-columns: 1fr auto;
  }
  .item-title {
    display: flex;
    align-items: center;
    h2 {
      margin: 0;
    }
  }
  .item-filters {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: flex-end;
      li {
        display: block;
      }
    }
  }
`;
