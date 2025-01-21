import { useRef, useEffect, useState } from "react";

interface Options {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export type InViewHookResponse = [(node?: Element | null) => void, boolean] & {
  ref: (node?: Element | null) => void;
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export default function useIntersectionObserver({ threshold, root, rootMargin }: Options = {}) {
  const [inView, setInView] = useState(false);
  // const ref = useRef<HTMLDivElement>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("开始渲染...:", ref);

    if (!ref) {
      console.warn("ref is null");
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("entry.isIntersecting:", entry.isIntersecting);
        setInView(entry.isIntersecting);
      },
      {
        threshold: threshold || 0,
        root: root || null,
        rootMargin: rootMargin || "0px",
      }
    );

    const currentRef = ref;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, ref]);
  let result = [setRef, inView] as InViewHookResponse;
  result.ref = result[0];
  result.inView = result[1];
  return result;
}
