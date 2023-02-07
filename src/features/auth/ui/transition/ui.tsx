import clsx from 'clsx';
import { useEffect, useState, type CSSProperties, PropsWithChildren } from 'react';
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
      style={{ '--offset': `${offset}px`, '--delay': `${delay}s` } as CSSProperties}
      className={clsx(startIn && styles[animation], mounted && styles.mounted)}
    >
      {children}
    </div>
  );
};
