import React from "react";
import styled, { css } from "styled-components";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const buttonsType = {
  primary: {
    background: "#d81f26",
    border: "transparent",
    color: "#fff",
  },
  secondary: {
    background: "#1f1f1f",
    border: "transparent",
    color: "#fff",
  },
  tertiary: {
    background: "#047fd1",
    border: "transparent",
    color: "#fff",
  },
};

export const Button = ({
  children,
  type = "primary",
  onClick,
  width = "auto",
  loading = false,
  disabled = false,
}) => {
  const btnStyle = buttonsType[type];
  return (
    <Container
      onClick={onClick}
      width={width}
      background={btnStyle.background}
      color={btnStyle.color}
      border={btnStyle.border}
      disabled={disabled}
    >
      <div className="content-button">
        {loading && (
          <FontAwesomeIcon
            icon={faSpinner}
            spin={loading}
            className="item-icon"
          />
        )}
        {children}
      </div>
    </Container>
  );
};

const Container = styled.button`
  ${({ background, color, border, width }) => css`
    width: ${width};
    border: ${border};
    background: ${background};
    color: ${color};
    text-transform: uppercase;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    border-radius: 1em;
    padding: 1.1rem 1.3rem;
    margin: 0.7rem 0;
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 0.5px;
    outline: none;
    transition: all ease-in-out 0.2s;
    ${mediaQuery.minTablet} {
      font-size: 1.4rem;
    }

    &:hover {
      transition: all ease-in-out 0.2s;
      background: ${background};
      box-shadow: 1px 3px 30px -8px ${background};
    }

    ${({ disabled }) =>
      disabled &&
      css`
        &:disabled,
        &[disabled] {
          border: #999999;
          background-color: #cccccc;
          cursor: not-allowed;
          color: #666666;
        }
      `}

    .content-button {
      display: flex;
      align-items: center;
      justify-content: center;
      .item-icon {
        margin-right: 0.7rem;
      }
    }
  `}
`;
