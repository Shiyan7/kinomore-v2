import clsx from 'clsx';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import NextLink from 'next/link';
import styles from './styles.module.scss';

interface LinkProps extends PropsWithChildren<AnchorHTMLAttributes<HTMLLinkElement>> {
  href: string;
}

export const Link = ({ className, children, href }: LinkProps) => {
  return (
    <NextLink href={href} className={clsx(styles.link, className)}>
      {children}
    </NextLink>
  );
};
