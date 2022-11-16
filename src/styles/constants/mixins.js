import { css } from "styled-components";
import { darken, lighten } from "polished";

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
      background: ${({ theme }) => darken(0.02, theme.colors.primary)};
    }
  }

  /* Handle on hover */
  &:hover {
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => lighten(0.03, theme.colors.primary)};
    }
  }
`;
