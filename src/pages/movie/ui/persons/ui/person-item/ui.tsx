import Image from 'next/image';
import Link from 'next/link';
import type { PersonInMovie } from 'shared/api';
import { paths } from 'shared/routing';
import { getProfession } from './lib';
import styles from './styles.module.scss';

interface PersonItemProps {
  item: PersonInMovie;
}

export const PersonItem = ({ item }: PersonItemProps) => (
  <Link className={styles.item} href={paths.person(item?.id)}>
    <div className={styles.image}>
      <Image sizes="100%" fill src={item?.photo ?? ''} alt={item?.name ?? item?.enName ?? ''} />
    </div>
    <span className={styles.name}>{item?.name ?? item?.enName}</span>
    <span className={styles.profession}>{getProfession(item?.profession ?? item?.enProfession)}</span>
  </Link>
);
