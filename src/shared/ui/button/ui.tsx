import clsx from 'clsx';
import { forwardRef, type ElementType, ReactNode, ButtonHTMLAttributes } from 'react';
import { Spinner } from 'shared/ui/spinner';
import styles from './styles.module.scss';

interface ButtonProps<E extends ElementType = ElementType> extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  skeletonLoading?: boolean;
  href?: string;
  rounded?: boolean;
  gradient?: boolean;
  size?: 'small' | 'regular' | 'medium' | 'big' | 'large';
  variant?: 'primary' | 'white' | 'gray' | 'glass';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  as?: E;
}

const DEFAULT_ELEMENT: ElementType = 'button';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      as,
      loading,
      rounded,
      startIcon,
      endIcon,
      skeletonLoading,
      variant = 'primary',
      size = 'regular',
      gradient,
      className,
      ...props
    },
    ref,
  ) => {
    const ButtonSpinner = (
      <div className={styles.spinner}>
        <Spinner strokeWidth={4} />
      </div>
    );

    const Element = as || DEFAULT_ELEMENT;

    return (
      <Element
        ref={ref}
        className={clsx(
          'btn-reset',
          styles.btn,
          {
            [styles.rounded]: rounded,
            [styles.skeleton]: skeletonLoading,
            [styles.gradient]: gradient,
          },
          styles[variant],
          styles[size],
          className,
        )}
        {...props}
      >
        {startIcon && <div className={styles.startIcon}>{startIcon}</div>}
        <span>{loading ? ButtonSpinner : children}</span>
        {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
      </Element>
    );
  },
);
