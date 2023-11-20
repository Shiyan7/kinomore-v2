import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { PropsWithChildren, CSSProperties } from 'react';
import styles from './styles.module.scss';

interface TransitionProps extends PropsWithChildren {
  startIn?: boolean;
  delay?: number;
  offset?: number;
  animation?: 'bounceInUp' | 'bounceOutUp';
}

export const Transition = ({
  children,
  animation = 'bounceInUp',
  offset = 40,
  delay = 0,
  startIn = true,
}: TransitionProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(startIn);
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIn]);

  return (
    <div
      className={clsx(startIn && styles[animation], mounted && styles.mounted)}
      style={
        { '--offset': `${offset}px`, '--delay': `${delay}s` } as CSSProperties
      }
    >
      {children}
    </div>
  );
};
