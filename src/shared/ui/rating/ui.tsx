import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface RatingProps extends PropsWithChildren {
  className?: string;
  size?: 'small' | 'medium';
}

export const Rating = ({ children, size = 'medium', className }: RatingProps) => {
  return <span className={clsx(styles.rating, styles[size], className)}>{children}</span>;
};
