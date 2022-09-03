import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const useQuery = () => {
  const location = useLocation();

  return useMemo(() => queryString.parse(location.search), [location]);
};
