import clsx from 'clsx';
import { Fragment } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { getSeasonString } from 'shared/lib/get-season-string';
import { getCountry, getAgeRating } from './lib';
import styles from './styles.module.scss';

export const Info = () => {
  const data = useStore(pageModel.$movie);

  const { ageRating, countries, seasonsInfo, year } = data!;

  const info = [
    year,
    seasonsInfo?.length ? getSeasonString(seasonsInfo.length) : null,
    countries?.length ? getCountry(countries) : null,
    ageRating ? getAgeRating(ageRating) : null,
  ];

  return (
    <ul className={clsx('list-reset', styles.list)}>
      {info.map((item, idx) => (
        <Fragment key={idx}>{item && <li className={styles.listItem}>{item}</li>}</Fragment>
      ))}
    </ul>
  );
};
