import clsx from 'clsx';
import { useEffect, useState, type CSSProperties, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface TransitionProps extends PropsWithChildren {
  delay?: number;
  offset?: number;
  variant?: 'bounceInBottom';
}

export const Transition = ({ children, variant = 'bounceInBottom', offset = 40, delay = 0 }: TransitionProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ '--offset': `${offset}px`, '--delay': `${delay}s` } as CSSProperties}
      className={clsx(styles[variant], mounted && styles.mounted)}>
      {children}
    </div>
  );
};
