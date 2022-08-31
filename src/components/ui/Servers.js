import React, { useState } from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";

export const Servers = ({
  servers = [],
  serverView = null,
  onSetServerEpisode,
}) => {
  const [serverType, setServerType] = useState("SUB");

  return (
    <Container>
      <div className="wrapper-types">
        {Object.keys(servers).map((serverType_, index) => (
          <ItemServersType
            key={index}
            isActive={serverType_ === serverType}
            onClick={() => {
              setServerType(serverType_);
              onSetServerEpisode(null);
            }}
          >
            {serverType_}
          </ItemServersType>
        ))}
      </div>
      <div className="wrapper-servers">
        <div className="item-servers">
          <ul>
            {servers[serverType].map((server, index) => (
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
    display: flex;
    grid-gap: 1em;
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
