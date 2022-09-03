import { useCallback, useState } from "react";

export const useAsync = (asyncFn, deps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);

  const callback = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        setOk(false);

        await asyncFn(...args);

        setOk(true);
      } catch (e) {
        setError(e);
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [...(deps || [])]
  );

  return [callback, loading, error, ok];
};
