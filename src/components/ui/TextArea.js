import React from "react";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./ComponentContainer";

export const TextArea = ({
  label,
  value,
  placeHolder,
  error,
  helperText,
  disabled,
  required = false,
  hidden = false,
  onChange,
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
      <Container disabled={disabled}>
        <textarea
          className="item-text-area"
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
  box-sizing: border-box;
  height: auto;
  ${({ theme, disabled }) => css`
    textarea {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 90px;
      box-sizing: border-box;
      border: none;
      padding: 1.1rem 1.3rem;
      font-size: 1em;
      font-weight: 600;
      outline: none;
      border-radius: ${theme.border_radius.large};
      ${disabled &&
      css`
        pointer-events: none;
      `}
    }
  `};
`;
