import React from "react";
import styled from "styled-components";

export const Input = ({
  placeHolder,
  label,
  required = false,
  error = false,
}) => {
  return (
    <Container>
      {label && (
        <label>
          {label}:{required && <span>*</span>}
        </label>
      )}

      <input type="text" className="item-input" placeholder={placeHolder} />
      {error && <span className="error-item">Campo Requerido</span>}
    </Container>
  );
};

const Container = styled.div`
  label {
    font-size: 1.1em;
    color: #fff;
    span {
      color: red;
    }
  }
  input {
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
`;
