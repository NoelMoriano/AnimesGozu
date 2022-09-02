import { useState } from "react";

// type Loading = Record<string, boolean>;
//
// type Return = [boolean, (loading: Loading) => void, (loading: boolean) => void];

export const useLoadings = (initialLoadings = {}) => {
  const [loadings, setLoadings] = useState(initialLoadings);

  const setLoading = (loading) =>
    setLoadings((prevIsLoadings) => ({
      ...prevIsLoadings,
      ...loading,
    }));

  const _setLoadings = (isLoading) => {
    const _loadings = {};

    Object.keys(loadings).forEach((loadingKey) => {
      _loadings[loadingKey] = isLoading;
    });

    setLoadings(_loadings);
  };

  const isLoadings = Object.values(loadings).some((isLoading) => isLoading);

  return [isLoadings, setLoading, _setLoadings];
};
