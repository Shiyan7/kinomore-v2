import Image from 'next/image';
import Link from 'next/link';
import type { SearchPerson } from 'shared/api';
import { getCurrentYear } from 'shared/lib';
import { paths } from 'shared/routing';
import styles from './styles.module.scss';

interface PersonItemProps {
  person: SearchPerson;
}

export const PersonItem = ({ person }: PersonItemProps) => {
  const age = getCurrentYear() - person?.age;

  const info = [person.enName, age]
    .filter((value) => !!value)
    .map((value) => value)
    .join(', ');

  return (
    <li className={styles.item}>
      <Link className={styles.link} href={paths.person(person?.id)}>
        <div className={styles.image}>
          <Image sizes="100%" fill quality={100} alt={person?.name} src={person?.photo} />
        </div>
        <div className={styles.text}>
          <span className={styles.name}>{person?.name}</span>
          <span className={styles.info}>{info}</span>
        </div>
      </Link>
    </li>
  );
};
