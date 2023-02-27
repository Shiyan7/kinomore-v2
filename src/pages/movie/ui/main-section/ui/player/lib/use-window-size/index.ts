import { useEffect, useState } from 'react';

type UseWindowSizeOutput = {
  width: number;
  height: number;
};

export function useWindowSize(): UseWindowSizeOutput {
  const [windowSize, setWindowSize] = useState<UseWindowSizeOutput>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}
