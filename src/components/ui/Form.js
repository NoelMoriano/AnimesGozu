import React from "react";
import styled from "styled-components";

export const Form = ({ children, ...props }) => {
  return (
    <FormContainer noValidate autoComplete="off" {...props}>
      {children}
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: grid;
  grid-row-gap: 1rem;
  padding: 0 1rem;
`;
