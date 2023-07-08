import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';

interface ObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export function useElementOnScreen<T extends Element = HTMLDivElement>(
  options: ObserverOptions,
): [RefObject<T>, boolean] {
  const containerRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  const optionsMemo = useMemo(() => options, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo);
    const currentTarget = containerRef.current;

    if (currentTarget) {
      return observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, options]);

  return [containerRef, isVisible];
}
