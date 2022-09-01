import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darken, lighten } from "polished";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { capitalize, orderBy } from "lodash";

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
  const disabledButtonChangeEpisodePrev = () => episode.episodeNumber <= 1;

  const disabledButtonChangeEpisodeNext = () =>
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
            disabledButtonChangeEpisode={!!disabledButtonChangeEpisodePrev()}
            disabled={!!disabledButtonChangeEpisodePrev()}
            onClick={() =>
              !disabledButtonChangeEpisodePrev() &&
              onNavigateTo(`/ver/${anime.id}/${episode.episodeNumber - 1}`)
            }
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </ItemButtonChangeEpisode>
          <ItemButtonChangeEpisode
            disabledButtonChangeEpisode={!!disabledButtonChangeEpisodeNext()}
            disabled={!!disabledButtonChangeEpisodeNext()}
            onClick={() =>
              !disabledButtonChangeEpisodeNext() &&
              onNavigateTo(`/ver/${anime.id}/${episode.episodeNumber + 1}`)
            }
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
                onClick={() => onSetServerEpisode(server)}
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
  cursor: pointer;
  width: auto;
  padding: 0.5em 1em;
  text-align: center;
  ${({ isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.colors.primary};
    `}
`;

const ItemServer = styled.div`
  cursor: pointer;
  width: auto;
  padding: 0.5em 1em;
  text-align: center;
  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => darken(0.01, theme.colors.secondary)};
    `}
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  font-size: 0.9em;
  .wrapper-types {
    display: grid;
    grid-template-columns: 1fr auto;

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
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      ul {
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(6em, auto));
        grid-gap: 1em;
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
            background: ${lighten(0.02, theme.colors.black)};
            cursor: not-allowed;
            color: ${lighten(0.02, theme.colors.gray)};
          }
        `
      : css`
          &:hover,
          &:active {
            transition: all ease-in-out 0.2s;
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `}
  `};
`;
