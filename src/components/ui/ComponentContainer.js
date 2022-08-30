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
      {error && (
        <div className="error-item">
          <ErrorItem
            fontColor={(theme) => (error ? theme.colors.error : undefined)}
            fontSize="small"
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
    display: grid;
    gap: 0.3em;

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
  ${({ theme, fontColor, fontSize = "small", error }) => css`
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
