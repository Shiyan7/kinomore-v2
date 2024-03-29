import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

interface SliderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={clsx('btn-reset', styles.btn, className)}
      ref={ref}
      {...props}
    >
      <Icon name="common/chevron" />
    </button>
  )
);
