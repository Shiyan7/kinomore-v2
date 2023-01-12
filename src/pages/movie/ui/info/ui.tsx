import clsx from 'clsx';
import { Fragment } from 'react';
import { useStore } from 'effector-react';
import { pageModel, getSeasonString, getAgeRating, getCountry } from 'pages/movie';
import styles from './styles.module.scss';

export const Info = () => {
  const data = useStore(pageModel.$movie);

  const info = [
    data?.year,
    getSeasonString(data?.seasonsInfo.length || 0),
    getCountry(data?.countries || []),
    getAgeRating(data?.ageRating || 0),
  ];

  return (
    <ul className={clsx('list-reset', styles.list)}>
      {info.map((item, idx) => (
        <Fragment key={idx}>{item && <li className={styles.listItem}>{item}</li>}</Fragment>
      ))}
    </ul>
  );
};
