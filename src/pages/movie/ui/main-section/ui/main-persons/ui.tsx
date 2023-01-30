import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { paths } from 'shared/routes';
import styles from './styles.module.scss';

const MAX_PERSONS = 5;

export const MainPersons = () => {
  const data = useStore(pageModel.$movie);

  const persons = data?.persons.slice(0, MAX_PERSONS);

  return (
    <ul className={clsx('list-reset', styles.list)}>
      {persons?.map((person, idx) => (
        <li className={styles.item} key={idx}>
          <Link href={paths.person(person?.id)} className={styles.link}>
            <div className={styles.image}>
              <Image sizes="100%" fill src={person?.photo} alt={person?.name} />
            </div>
            <span className={styles.name}>{person?.name ?? person?.enName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
