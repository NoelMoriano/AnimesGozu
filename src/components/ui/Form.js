import React from "react";
import styled from "styled-components";

export const Form = ({ children, ...props }) => (
  <FormContainer noValidate autoComplete="off" {...props}>
    <div>{children}</div>
  </FormContainer>
);

const FormContainer = styled.form`
  display: grid;
  grid-row-gap: 1rem;
`;
