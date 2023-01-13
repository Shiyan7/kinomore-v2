import { useEffect, useRef, useState } from 'react';

export function useHeaderFixed() {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const lastScrollTop = useRef<number>(0);

  useEffect(() => {
    const headerFixed = () => {
      const scrollDistance = window.scrollY;
      const isFixed = scrollDistance > lastScrollTop.current;

      setIsFixed(isFixed);

      lastScrollTop.current = scrollDistance;
    };

    window.addEventListener('scroll', headerFixed, { passive: true });

    return () => window.removeEventListener('scroll', headerFixed);
  }, []);

  return {
    isFixed,
    setIsFixed,
  };
}
