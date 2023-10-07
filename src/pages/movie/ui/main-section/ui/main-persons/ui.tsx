import clsx from 'clsx';
import { useStore } from 'effector-react';
import { movieModel } from 'pages/movie';
import { paths } from 'shared/routing';
import { Link } from 'shared/ui/link';
import { getActors, getDirector } from './lib';
import styles from './styles.module.scss';

export const MainPersons = () => {
  const data = useStore(movieModel.$movie);

  const items = [
    { label: 'Режиссёр', list: getDirector(data?.persons ?? []) },
    { label: 'Актеры', list: getActors(data?.persons ?? []) },
  ];

  return (
    <div className={styles.root}>
      {items.map(({ label, list }) => (
        <div key={label} className={styles.row}>
          <span className={styles.label}>{label}:</span>
          <ul className={clsx('list-reset', styles.list)}>
            {list?.map((item) => {
              const name = item?.name ?? item?.enName;

              return (
                <li className={styles.item} key={item?.id}>
                  <Link className={styles.link} href={paths.person(item?.id)}>
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
