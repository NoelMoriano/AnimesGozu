import React, { useState } from "react";
import styled from "styled-components";

export const InputPassword = ({
  placeHolder,
  register,
  label,
  required = false,
  error = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container>
      {label && (
        <label>
          {label} {required && <span>*</span>}
        </label>
      )}

      <input
        type={showPassword ? "text" : "password"}
        className="item-input"
        placeholder={placeHolder}
        {...register}
      />
      <div className="checkbox-item">
        <span onClick={() => setShowPassword(!showPassword)}>
          <input type="checkbox" checked={showPassword} />
          Mostrar contraseña
        </span>
      </div>
      {error && <span className="error-item">Campo Requerido</span>}
    </Container>
  );
};

const Container = styled.div`
  label {
    font-size: 1em;
    color: #fff;
    span {
      color: red;
    }
  }
  .item-input {
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #ebebeb;
    border: none;
    border-radius: 1em;
    padding: 1.1rem 1.3rem;
    margin: 0.3rem 0;
    font-size: 1em;
    font-weight: 600;
    outline: none;
    color: #3a3030;
  }
  .error-item {
    color: red;
    font-size: 0.8em;
  }
  .checkbox-item {
    color: #fff;
    span {
      cursor: pointer;
      margin: 0.7rem 0;
      display: flex;
      justify-content: start;
      font-size: 0.9em;
      input {
        margin-right: 1rem;
      }
    }
  }
`;
