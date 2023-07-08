import Image from 'next/image';
import Link from 'next/link';
import { paths } from 'shared/routing';
import styles from './styles.module.scss';

export const Logo = () => (
  <Link href={paths.home} className={styles.logo}>
    <Image priority className={styles.image} width={131} height={26} src="/logo.svg" alt="Kinomore" />
  </Link>
);
