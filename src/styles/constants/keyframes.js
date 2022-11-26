import { keyframes as styledKeyframes } from "styled-components";

const shake = styledKeyframes`
     10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
`;

const pulse = styledKeyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.61);
    }

    70% {
      box-shadow: 0 0 0 10px rgba(24, 144, 255, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
    }
`;

const zoomOutZoomIn = styledKeyframes`
  0% {
  transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1.1, 1.1);
  }
`;

export const keyframes = {
  shake,
  pulse,
  zoomOutZoomIn,
};
