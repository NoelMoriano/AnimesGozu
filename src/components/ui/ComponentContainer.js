import React from "react";
import styled, { css } from "styled-components";
import { keyframes } from "../../styles/constants/keyframes";

export const ComponentContainer = ({
  label,
  required = false,
  disabled = false,
  hidden = false,
  error = false,
  helperText,
  children,
}) => {
  return (
    <Container
      disabled={disabled}
      required={required}
      hidden={hidden}
      error={error}
      className={error && "scroll-error-anchor"}
    >
      {label && <div className="label-item">{label}</div>}
      <div className="element-item">{children}</div>
      {helperText && (
        <div className="error-item">
          <ErrorItem
            fontColor={(theme) => (error ? theme.colors.error : undefined)}
            error={error}
          >
            {helperText}
          </ErrorItem>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${({ theme, disabled, required, hidden, error }) => css`
    width: auto;
    height: auto;
    box-sizing: border-box;
    display: grid;
    gap: 0.3em;
    animation: ${error && keyframes.shake} 340ms
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

    ${disabled &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `}

    ${hidden &&
    css`
      display: none;
    `}

    .label-item {
      text-align: left;
      font-size: 0.9em;
      ${required &&
      css`
        ::after {
          display: inline-block;
          margin-left: 0.2rem;
          color: ${error && "red"};
          line-height: 1;
          content: "*";
        }
      `}
    }

    .element-item {
      overflow: hidden;
      border-radius: ${theme.border_radius.large};
      border: 2px solid ${error ? theme.colors.error : "transparent"};
    }

    .error-item {
      text-align: left;
    }
  `}
`;

const ErrorItem = styled.div`
  ${({ theme, fontColor, fontSize = "x_small", error }) => css`
    font-size: ${theme.font_sizes[fontSize]};
    ${fontColor &&
    css`
      color: ${fontColor(theme)};
    `},
    ${error &&
    css`
      animation: ${keyframes.shake} 340ms;
    `}
  `}
`;
