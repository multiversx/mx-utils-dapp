import { useCallback, useRef } from "react";

export const useExecuteOnce = () => {
  const inProgress = useRef(false);

  return useCallback(
    (callback: CallableFunction) => {
      if (inProgress.current) {
        return;
      }

      inProgress.current = true;
      callback();
    },
    [],
  );
};
