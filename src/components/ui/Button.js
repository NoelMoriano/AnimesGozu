import React from "react";
import styled, { css } from "styled-components";
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

const buttonsSize = {
  small: {
    fontSize: ".8em",
    padding: ".5rem .7rem",
  },
  medium: {
    fontSize: "1.1em",
    padding: ".8rem 1rem",
  },
  large: {
    fontSize: "1.4em",
    padding: "1.1rem 1.3rem",
  },
};

export const Button = ({
  children,
  type = "primary",
  size = "large",
  onClick,
  width = "auto",
  loading = false,
  disabled = false,
  block = false,
}) => {
  const btnType = buttonsType[type];
  const btnSize = buttonsSize[size];
  return (
    <Container
      onClick={onClick}
      width={width}
      background={btnType.background}
      color={btnType.color}
      border={btnType.border}
      disabled={disabled}
      block={block}
      padding={btnSize.padding}
      fontSize={btnSize.fontSize}
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
  ${({ background, color, border, width, block, padding, fontSize }) => css`
    width: ${block ? "100%" : width};
    border: ${border};
    background: ${background};
    color: ${color};
    text-transform: uppercase;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    border-radius: 1em;
    padding: ${padding};
    margin: 0.7rem 0;
    font-size: ${fontSize};
    font-weight: bold;
    letter-spacing: 0.5px;
    outline: none;
    transition: all ease-in-out 0.2s;

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
