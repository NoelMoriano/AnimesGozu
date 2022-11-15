import { css } from "styled-components";

export const ScrollStyle = ({ width = "4px", height = "auto" }) => css`
  /* width */
  ::-webkit-scrollbar {
    width: ${width};
    height: ${height};
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &:hover {
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  /* Handle on hover */
  &:hover {
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;
