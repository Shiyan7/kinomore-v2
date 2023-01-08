import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface RatingProps {
  className?: string;
  size?: 'small' | 'medium';
}

export const Rating: FC<PropsWithChildren<RatingProps>> = ({ children, size = 'medium', className }) => {
  return <span className={clsx(styles.rating, styles[size], className)}>{children}</span>;
};
