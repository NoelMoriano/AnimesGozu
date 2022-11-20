import React from "react";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./ComponentContainer";

export const Input = ({
  label,
  value,
  placeHolder,
  error,
  helperText,
  disabled,
  required = false,
  hidden = false,
  type = "text",
  onChange,
  fontSize = "16px",
}) => {
  return (
    <ComponentContainer
      label={label}
      required={required}
      helperText={helperText}
      error={error}
      disabled={disabled}
      hidden={hidden}
    >
      <Container disabled={disabled} fontSize={fontSize}>
        <input
          type={type}
          className="item-input"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          allowClear={!disabled}
          disabled={disabled}
        />
      </Container>
    </ComponentContainer>
  );
};

const Container = styled.div`
  ${({ theme, disabled, fontSize }) => css`
    input {
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: none;
      padding: 1.1em 1.3em;
      font-size: ${fontSize};
      font-weight: 600;
      outline: none;
      color: ${theme.colors.dark};
      ${disabled &&
      css`
        pointer-events: none;
      `}
    }
  `};
`;
