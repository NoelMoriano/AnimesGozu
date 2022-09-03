import { breakPoints } from "./breakPoints";

export const mediaQuery = {
  minMobileS: `@media (min-width: ${breakPoints.mobile_s}px)`,
  minMobile: `@media (min-width: ${breakPoints.mobile}px)`,
  minTablet: `@media (min-width: ${breakPoints.tablet}px)`,
  minDesktop: `@media (min-width: ${breakPoints.desktop}px)`,
  minHighResolution: `@media (min-width: ${breakPoints.high_resolution}px)`,
  maxMobileS: `@media (max-width: ${breakPoints.mobile - 1}px)`,
  maxMobile: `@media (max-width: ${breakPoints.tablet - 1}px)`,
  maxTablet: `@media (max-width: ${breakPoints.desktop - 1}px)`,
  maxDesktop: `@media (max-width: ${breakPoints.desktop_large - 1}px)`,
  maxDesktopLarge: `@media (max-width: ${breakPoints.high_resolution - 1}px)`,
};
