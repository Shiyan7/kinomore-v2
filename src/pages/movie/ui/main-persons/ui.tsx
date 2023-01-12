import clsx from 'clsx';
import { useStore } from 'effector-react';
import Image from 'next/image';
import Link from 'next/link';
import { pageModel } from 'pages/movie';
import styles from './styles.module.scss';

export const MainPersons = () => {
  const data = useStore(pageModel.$movie);

  return (
    <ul className={clsx('list-reset', styles.list)}>
      {data?.persons?.slice(0, 5).map((person, idx) => (
        <li className={styles.item} key={idx}>
          <Link href="#" className={styles.link}>
            <div className={styles.image}>
              <Image sizes="100%" fill src={person.photo} alt={person?.name} />
            </div>
            <span className={styles.name}>{person.name || person.enName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
