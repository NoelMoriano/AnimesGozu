import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darken } from "polished";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Servers = ({
  servers = [],
  serverView = null,
  onSetServerEpisode,
}) => {
  const [serverType, setServerType] = useState("SUB");

  return (
    <Container>
      <div className="wrapper-types">
        <div className="server-types">
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
        <div className="pagination-buttons">
          <div className="item-prev">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="item-next">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
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
    display: grid;
    grid-template-columns: 1fr auto;

    .server-types {
      display: flex;
    }
    .pagination-buttons {
      display: flex;
      .item-prev,
      .item-next {
        cursor: pointer;
        width: auto;
        padding: 0 2em;
        text-align: center;
        color: ${({ theme }) => theme.colors.light};
        background: ${({ theme }) => theme.colors.dark};
        font-size: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ease-in-out 0.2s;
        &:hover {
          transition: all ease-in-out 0.2s;
          background: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.white};
        }
      }
      .item-next {
      }
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
