import { useEffect } from 'react';

export function useLockedBody(locked = false) {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;

      document.body.style.paddingRight = '0px';
    };
  }, [locked]);
}
