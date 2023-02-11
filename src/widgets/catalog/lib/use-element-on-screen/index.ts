/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

interface ObserverOptions {
  root: Element | null;
  rootMargin: string;
  treshold: number;
}

export function useElementOnScreen(options: ObserverOptions, targetRef: RefObject<HTMLElement>, callback: () => void) {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = useCallback((entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  const optionsMemo = useMemo(() => options, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo);
    const currentTarget = targetRef.current;

    if (currentTarget) {
      return observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetRef.current, options]);

  useEffect(() => {
    if (isVisible) {
      callback();
    }
  }, [isVisible]);
}
