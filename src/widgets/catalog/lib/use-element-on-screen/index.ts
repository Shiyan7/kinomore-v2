import { useCallback, useEffect, useMemo, useState, type RefObject } from 'react';

interface ObserverOptions {
  root: Element | null;
  rootMargin: string;
  treshold: number;
}

export function useElementOnScreen(options: ObserverOptions, targetRef: RefObject<HTMLElement>): boolean {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = useCallback((entries: IntersectionObserverEntry[]) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef.current, options]);

  return isVisible;
}
