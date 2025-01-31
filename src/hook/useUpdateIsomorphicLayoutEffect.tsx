import React, { useLayoutEffect } from "react";

const useUpdateIsomorphicLayoutEffect = (callback: React.EffectCallback, deep?: React.DependencyList) => {
  const isMounted = React.useRef<boolean>(false);

  useLayoutEffect(() => {
    return () => {
      console.log("isMounted is false");
      isMounted.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      console.log("isMounted is true");
    } else {
      callback();
    }
  }, deep);
};

export default useUpdateIsomorphicLayoutEffect;
