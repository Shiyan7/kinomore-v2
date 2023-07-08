import clsx from 'clsx';
import NextLink from 'next/link';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface LinkProps extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {
  href: string;
}

export const Link = ({ className, children, ...props }: LinkProps) => (
  <NextLink className={clsx(styles.link, className)} {...props}>
    {children}
  </NextLink>
);
