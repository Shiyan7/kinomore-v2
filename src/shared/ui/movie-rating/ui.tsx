import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface RatingProps extends PropsWithChildren {
  className?: string;
  size?: 'small' | 'medium';
  showState?: boolean;
}

export const MovieRating = ({ children, showState, size = 'medium', className }: RatingProps) => {
  const rating = Number(children);
  const isHighRating = rating >= 6;

  return (
    <span className={clsx(styles.rating, showState && isHighRating && styles.isHighRating, styles[size], className)}>
      {children}
    </span>
  );
};
