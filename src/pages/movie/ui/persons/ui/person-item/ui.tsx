import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import type { Person } from 'shared/api';
import { getProfession } from './lib';
import styles from './styles.module.scss';

interface PersonItemProps {
  item: Person;
}

export const PersonItem: FC<PersonItemProps> = ({ item }) => {
  return (
    <Link className={styles.item} href="#">
      <div className={styles.image}>
        <Image sizes="100%" fill src={item?.photo} alt={item?.name ?? item?.enName} />
      </div>
      <span className={styles.name}>{item?.name ?? item?.enName}</span>
      <span className={styles.profession}>{getProfession(item?.profession ?? item?.enProfession)}</span>
    </Link>
  );
};
