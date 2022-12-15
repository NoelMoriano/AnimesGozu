import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";

const buttonsType = {
  primary: {
    background: theme.colors.primary,
    border: "transparent",
    color: "#fff",
  },
  secondary: {
    background: theme.colors.tertiary,
    border: "transparent",
    color: "#fff",
  },
  tertiary: {
    background: theme.colors.quinary,
    border: "transparent",
    color: "#fff",
  },
  quaternary: {
    background: "#fbe706",
    border: "transparent",
    color: "#1a1a1a",
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
  htmlType = "button",
  size = "large",
  onClick,
  width = "auto",
  height = "auto",
  loading = false,
  disabled = false,
  block = false,
  animate = false,
  borderRadius = "1em",
  margin = "0.7rem 0",
}) => {
  const btnType = buttonsType[type];
  const btnSize = buttonsSize[size];

  return (
    <Container
      onClick={onClick}
      width={width}
      height={height}
      background={btnType.background}
      color={btnType.color}
      border={btnType.border}
      disabled={disabled}
      loading={loading}
      block={block}
      animate={animate}
      padding={btnSize.padding}
      fontSize={btnSize.fontSize}
      borderRadius={borderRadius}
      margin={margin}
      type={htmlType}
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
  ${({
    background,
    color,
    border,
    width,
    height,
    block,
    animate,
    padding,
    fontSize,
    borderRadius,
    margin,
    disabled,
    loading,
  }) => css`
    width: ${block ? "100%" : width};
    height: ${block ? "auto" : height};
    border: ${border};
    background: ${background};
    color: ${color};
    text-transform: uppercase;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: none;
    border-radius: ${borderRadius};
    padding: ${padding};
    margin: ${margin};
    font-size: ${fontSize};
    font-weight: bold;
    letter-spacing: 0.5px;
    outline: none;
    transition: all ease-in-out 0.2s;
    transform: scale(1);

    ${disabled || loading
      ? css`
          &:disabled,
          &[disabled] {
            border: #999999;
            background-color: #cccccc;
            cursor: not-allowed;
            color: #666666;
          }
        `
      : css`
          &:hover {
            transition: all ease-in-out 0.2s;
            background: ${background};
            box-shadow: 0 3px 34px -4px ${background};
            ${animate &&
            css`
              transform: scale(1.06);
            `}
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
