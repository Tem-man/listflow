import React, { useLayoutEffect } from "react";

const useUpdateIsomorphicLayoutEffect = (callback: React.EffectCallback, deep?: React.DependencyList) => {
  const isMounted = React.useRef<boolean>(false);

  useLayoutEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      callback();
    }
  }, deep);
};

export default useUpdateIsomorphicLayoutEffect;
