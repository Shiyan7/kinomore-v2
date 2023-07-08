import clsx from 'clsx';
import type { CSSProperties } from 'react';
import styles from './styles.module.scss';

interface SpinnerProps {
  className?: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  r?: number;
}

export const Spinner = ({ className, size = 50, r = 20, stroke = '#fff', strokeWidth = 5 }: SpinnerProps) => (
  <div className={clsx(styles.spinner, className)} style={{ '--spinner-size': `${size}px` } as CSSProperties}>
    <svg viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke={stroke} fill="none" strokeWidth={strokeWidth} />
    </svg>
  </div>
);
