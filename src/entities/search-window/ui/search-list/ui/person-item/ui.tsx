import Image from 'next/image';
import Link from 'next/link';
import type { PersonCard } from 'shared/api';
import { paramsToString } from 'shared/lib';
import { paths } from 'shared/routing';
import { getPersonAge } from './lib';
import styles from './styles.module.scss';

interface PersonItemProps {
  person: PersonCard;
}

export const PersonItem = ({ person }: PersonItemProps) => {
  const age = getPersonAge(person.age);
  const info = paramsToString([person.enName, age]);

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
