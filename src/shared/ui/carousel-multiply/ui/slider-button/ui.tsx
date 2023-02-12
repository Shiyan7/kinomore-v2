import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ChevronIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

interface SliderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(({ className, ...props }, ref) => {
  return (
    <button className={clsx('btn-reset', styles.btn, className)} ref={ref} {...props}>
      <ChevronIcon />
    </button>
  );
});
