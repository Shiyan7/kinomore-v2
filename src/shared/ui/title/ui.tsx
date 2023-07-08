import clsx from 'clsx';
import type { ComponentProps, ElementType, ReactNode } from 'react';
import styles from './styles.module.scss';

interface TitleOwnProps<E extends ElementType = ElementType> {
  className?: string;
  children: ReactNode;
  href?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  as?: E;
}

const DEFAULT_ELEMENT: ElementType = 'h1';

export type TitleProps<E extends ElementType> = TitleOwnProps<E> & Omit<ComponentProps<E>, keyof TitleOwnProps>;

export const Title = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  className,
  children,
  size = 'large',
  as,
  ...props
}: TitleProps<E>) => {
  const Element = as || DEFAULT_ELEMENT;

  return (
    <Element className={clsx(styles.title, styles[size], className)} {...props}>
      {children}
    </Element>
  );
};
