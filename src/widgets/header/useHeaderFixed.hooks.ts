import { useEffect, useRef, useState } from "react";

export const useHeaderFixed = () => {
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerFixed = () => {
      const scrollTop = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight;
      const condition = scrollTop > headerHeight!;

      setIsFixed(condition);
    };

    window.addEventListener("scroll", headerFixed, { passive: true });

    return () => window.removeEventListener("scroll", headerFixed);
  }, []);

  return {
    isFixed,
    headerRef,
  };
};
