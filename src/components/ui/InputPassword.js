import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./ComponentContainer";

export const InputPassword = ({
  label,
  value,
  placeHolder,
  error,
  helperText,
  disabled,
  required = false,
  hidden = false,
  onChange,
  visiblePassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(visiblePassword);
  return (
    <>
      <ComponentContainer
        label={label}
        required={required}
        helperText={helperText}
        error={error}
        disabled={disabled}
        hidden={hidden}
      >
        <Container disabled={disabled}>
          <input
            type={showPassword ? "text" : "password"}
            className="item-input"
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            allowClear={!disabled}
            disabled={disabled}
          />
        </Container>
      </ComponentContainer>
      <ItemCheckbox>
        <span onClick={() => setShowPassword(!showPassword)}>
          <input type="checkbox" checked={showPassword} />
          Mostrar contraseña
        </span>
      </ItemCheckbox>
    </>
  );
};

const Container = styled.div`
  ${({ theme, disabled }) => css`
    input {
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: none;
      padding: 1.1rem 1.3rem;
      font-size: 1em;
      font-weight: 600;
      outline: none;
      color: ${theme.colors.dark};
      ${disabled &&
      css`
        pointer-events: none;
      `}
    }
  `}
`;

const ItemCheckbox = styled.div`
  color: ${({ theme }) => theme.colors.white};
  span {
    cursor: pointer;
    display: flex;
    justify-content: start;
    font-size: 0.9em;
    input {
      margin-right: 0.5em;
    }
  }
`;
