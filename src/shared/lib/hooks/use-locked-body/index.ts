import { useEffect, useState } from "react";

type UseLockedBodyOutput = [boolean, (locked: boolean) => void];

export function useLockedBody(initialLocked = false): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked);

  useEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;

      setTimeout(() => {
        document.body.style.paddingRight = originalPaddingRight;
      }, 300);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}
