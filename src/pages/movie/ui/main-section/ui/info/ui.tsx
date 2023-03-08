import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { Rating } from 'shared/ui/rating';
import { getRating, minutesToHour, getSeasonString } from 'shared/lib';
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
      {items
        .filter((item) => !!item)
        .map((item, idx) => (
          <span key={idx} className={styles.item}>
            {item}
          </span>
        ))}
    </div>
  );
};
