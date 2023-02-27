import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { items } from './config';
import styles from './styles.module.scss';

export const Nav = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      <ul className={clsx('list-reset', styles.list)}>
        {items.map((item) => {
          const isCurrentPage = pathname === item.href;

          return (
            <li key={item.text} className={styles.item}>
              <Link className={clsx(styles.link, isCurrentPage && styles.isCurrent)} href={item.href}>
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
