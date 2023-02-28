import { Fragment } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { getSeasonString } from 'shared/lib/get-season-string';
import { Rating } from 'shared/ui';
import { getRating, minutesToHour } from 'shared/lib';
import { getCountry, getAgeRating, getGenre } from './lib';
import styles from './styles.module.scss';

export const Info = () => {
  const data = useStore(pageModel.$movie);

  const length = data?.seasonsInfo?.length
    ? getSeasonString(data?.seasonsInfo.length)
    : minutesToHour(data?.movieLength);

  const items = [
    data?.year,
    data?.genres ? getGenre(data.genres) : null,
    data?.ageRating ? getAgeRating(data.ageRating) : null,
    data?.countries?.length ? getCountry(data?.countries) : null,
    length,
  ];

  return (
    <div className={styles.root}>
      <Rating showState className={styles.rating}>
        {getRating(data?.rating)}
      </Rating>
      {items.map((item, idx) => (
        <Fragment key={idx}>{item && <span className={styles.item}>{item}</span>}</Fragment>
      ))}
    </div>
  );
};
