import type { FC, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface SpinnerProps {
  className?: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  r?: number;
}

export const Spinner: FC<SpinnerProps> = ({ className, size = 50, r = 20, stroke = '#fff', strokeWidth = 5 }) => {
  return (
    <div className={clsx(styles.spinner, className)} style={{ '--spinner-size': `${size}px` } as CSSProperties}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={stroke} fill='none' strokeWidth={strokeWidth} />
      </svg>
    </div>
  );
};
