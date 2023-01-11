import clsx from 'clsx';
import type { ElementType, ReactNode, ComponentProps } from 'react';
import { Spinner } from 'shared/ui/spinner';
import styles from './styles.module.scss';

interface ButtonOwnProps<E extends ElementType = ElementType> {
  className?: string;
  loading?: boolean;
  size?: 'small' | 'regular' | 'medium';
  variant?: 'primary' | 'glass';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  as?: E;
}

const DEFAULT_ELEMENT: ElementType = 'button';

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>;

export const Button = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  children,
  as,
  loading,
  startIcon,
  endIcon,
  variant = 'primary',
  size = 'regular',
  className,
  ...props
}: ButtonProps<E>) => {
  const ButtonSpinner = (
    <div className={styles.spinner}>
      <Spinner strokeWidth={4} />
    </div>
  );

  const Element = as || DEFAULT_ELEMENT;

  return (
    <Element className={clsx('btn-reset', styles.btn, styles[variant], styles[size], className)} {...props}>
      {startIcon && <div className={styles.startIcon}>{startIcon}</div>}
      <span>{loading ? ButtonSpinner : children}</span>
      {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
    </Element>
  );
};
