import { useMemo, useState } from "react";
import { breakPoints } from "../styles/constants/breakPoints";

export const useDevice = () => {
  const [currentScreenWidth, setCurrentScreenWidth] = useState(
    window.innerWidth
  );
  const [currentScreenHeight, setCurrentScreenHeight] = useState(
    window.innerHeight
  );

  useMemo(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { clientWidth, clientHeight } = entries[0]?.target;

      setCurrentScreenWidth(clientWidth);
      setCurrentScreenHeight(clientHeight);
    });

    resizeObserver.observe(document.body);
  }, []);

  const isDeviceMobile =
    !!navigator.userAgent.match("Android") ||
    !!navigator.userAgent.match("iPhone") ||
    !!navigator.userAgent.match("iPad");

  return {
    currentScreenHeight,
    currentScreenWidth,
    isMobile: currentScreenWidth < breakPoints.desktop,
    isDevice: { mobile: isDeviceMobile },
  };
};
