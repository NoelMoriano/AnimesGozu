import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darken, lighten } from "polished";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { capitalize, orderBy } from "lodash";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { ScrollStyle } from "../../styles/constants/mixins";
import ReactGA from "react-ga4";

export const Servers = ({
  servers = [],
  serverView = null,
  onSetServerEpisode,
  anime,
  episode,
  onNavigateTo,
  serverType,
  onSetServerType,
}) => {
  const disabledButtonChangeEpisodePrev = episode.episodeNumber <= 1;

  const disabledButtonChangeEpisodeNext =
    episode.episodeNumber >= anime.totalEpisodes;

  const orderServersTypesBy = (serversTypes = []) =>
    orderBy(serversTypes || [], (serverType) => capitalize(serverType), [
      "asc",
    ]);

  const orderServersBy = (servers = []) =>
    orderBy(servers || [], (server) => capitalize(server.server), ["asc"]);

  return (
    <Container>
      <div className="wrapper-types">
        <div className="server-types">
          {orderServersTypesBy(Object.keys(servers)).map(
            (serverType_, index) => (
              <ItemServersType
                key={index}
                isActive={serverType_ === serverType}
                onClick={() => {
                  ReactGA.event({
                    category: "server-types",
                    action: "click-server-type",
                    label: `Click server type: ${serverType_.toLowerCase()}`,
                  });
                  onSetServerType(serverType_);
                  onSetServerEpisode(null);
                }}
              >
                {serverType_}
              </ItemServersType>
            )
          )}
        </div>
        <div className="pagination-buttons">
          <ItemButtonChangeEpisode
            disabledButtonChangeEpisode={!!disabledButtonChangeEpisodePrev}
            disabled={!!disabledButtonChangeEpisodePrev}
            onClick={() => {
              ReactGA.event({
                category: "buttons",
                action: "click-button-prev",
                label: `Click button prev: ${episode.episodeNumber - 1}`,
              });

              return (
                !disabledButtonChangeEpisodePrev &&
                onNavigateTo(
                  `/ver/${anime.nameId}/${episode.episodeNumber - 1}`
                )
              );
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </ItemButtonChangeEpisode>
          <ItemButtonChangeEpisode
            disabledButtonChangeEpisode={!!disabledButtonChangeEpisodeNext}
            disabled={!!disabledButtonChangeEpisodeNext}
            onClick={() => {
              ReactGA.event({
                category: "buttons",
                action: "click-button-next",
                label: `Click button next: ${episode.episodeNumber + 1}`,
              });

              return (
                !disabledButtonChangeEpisodeNext &&
                onNavigateTo(
                  `/ver/${anime.nameId}/${episode.episodeNumber + 1}`
                )
              );
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </ItemButtonChangeEpisode>
        </div>
      </div>
      <div className="wrapper-servers">
        <div className="item-servers">
          <ul>
            {orderServersBy(servers[serverType]).map((server, index) => (
              <ItemServer
                key={index}
                isActive={server.server === serverView?.server}
                onClick={() => {
                  ReactGA.event({
                    category: "buttons",
                    action: "click-button-server",
                    label: `Click button server: ${server}`,
                  });
                  return onSetServerEpisode(server);
                }}
              >
                {server.title}
              </ItemServer>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

const ItemServersType = styled.div`
  ${({ isActive, theme }) =>
    css`
      cursor: pointer;
      width: auto;
      padding: 0.5em 1em;
      text-align: center;
      &:hover {
        background: ${!isActive && darken(0.01, theme.colors.secondary)};
      }

      ${isActive &&
      css`
        color: ${theme.colors.white};
        background: ${theme.colors.primary};
      `}
    `}
`;

const ItemServer = styled.li`
  cursor: pointer;
  min-width: 8em;
  width: auto;
  padding: 0.5em 1em;
  text-align: center;

  &:hover {
    background: ${({ theme }) => darken(0.01, theme.colors.secondary)};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.white};
      border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => darken(0.01, theme.colors.secondary)};
    `}
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.font2};
  .wrapper-types {
    display: grid;
    grid-template-columns: 1fr auto;
    background: ${({ theme }) => theme.colors.tertiary};
    border-bottom: ${({ theme }) =>
      `1px solid ${lighten(0.05, theme.colors.tertiary)}`};
    .server-types {
      display: flex;
    }
    .pagination-buttons {
      display: flex;
    }
  }

  .wrapper-servers {
    width: 100%;
    max-width: 100%;
    background: ${({ theme }) => theme.colors.tertiary};
    .item-servers {
      position: relative;
      max-width: 100%;
      width: 100%;
      overflow-x: auto;
      ${ScrollStyle({ width: "auto", height: "5px" })};
      ul {
        width: 7em;
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
      }
    }
  }
`;

const ItemButtonChangeEpisode = styled.button`
  ${({ theme, disabledButtonChangeEpisode = false }) => css`
    cursor: pointer;
    border: none;
    width: auto;
    padding: 0 2em;
    text-align: center;
    color: ${theme.colors.light};
    background: ${theme.colors.dark};
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 0.2s;

    ${disabledButtonChangeEpisode
      ? css`
          &:disabled,
          &[disabled] {
            background: ${lighten(0.02, theme.colors.secondary)};
            cursor: not-allowed;
            color: ${lighten(0.02, theme.colors.gray)};
          }
        `
      : css`
          &:active {
            transition: all ease-in-out 0.2s;
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
          ${mediaQuery.minTablet} {
            &:hover {
              transition: all ease-in-out 0.2s;
              background: ${theme.colors.primary};
              color: ${theme.colors.white};
            }
          }
        `}
  `};
`;
