import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends PropsWithChildren {
  rootId?: string;
}

export const Portal = ({ rootId, children }: PortalProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    containerRef.current = document.querySelector(`${rootId}`);
    return () => setMounted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mounted && !!containerRef.current ? createPortal(children, containerRef.current) : null;
};
