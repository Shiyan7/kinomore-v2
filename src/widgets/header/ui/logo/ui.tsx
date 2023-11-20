import Image from 'next/image';
import Link from 'next/link';
import { paths } from 'shared/routing';
import styles from './styles.module.scss';

export const Logo = () => (
  <Link className={styles.logo} href={paths.home}>
    <Image
      alt="Kinomore"
      className={styles.image}
      height={26}
      priority
      src="/logo.svg"
      width={131}
    />
  </Link>
);
