import styled, { css } from "styled-components";

export const Select = ({ title }) => {
  return (
    <Container>
      <select>
        <option>{title}</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => css`
    select {
      border: none;
      color: ${theme.colors.font1};
      background: ${theme.colors.quaternary};
      padding: 0.6rem;
      border-radius: 0.5em;
    }
  `}
`;
