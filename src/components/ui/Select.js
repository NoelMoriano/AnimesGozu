import styled, { css } from "styled-components";

export const Select = ({ title, onFilterAnimes, options = [] }) => {
  return (
    <Container>
      <select onChange={(e) => onFilterAnimes(e.target.value)}>
        <option value="all">{title}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
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
      padding: 0.5rem;
      border-radius: 0.5em;
    }
  `}
`;
