import { useStore } from 'effector-react';
import { movieModel } from 'pages/movie';
import { getRating, minutesToHour, getSeasonString } from 'shared/lib';
import { MovieRating } from 'shared/ui/movie-rating';
import { getCountry, getAgeRating, getGenre } from './lib';
import styles from './styles.module.scss';

export const Info = () => {
  const data = useStore(movieModel.$movie);

  const length = data?.seasonsInfo?.length
    ? getSeasonString(data?.seasonsInfo.length)
    : minutesToHour(data?.movieLength ?? 0);

  const items = [
    data?.year,
    data?.genres ? getGenre(data.genres) : null,
    data?.ageRating ? getAgeRating(data.ageRating) : null,
    data?.countries?.length ? getCountry(data?.countries) : null,
    length,
  ];

  return (
    <div className={styles.root}>
      <MovieRating showState className={styles.rating}>
        {getRating(data?.rating)}
      </MovieRating>
      {items.filter(Boolean).map((item) => (
        <span key={item} className={styles.item}>
          {item}
        </span>
      ))}
    </div>
  );
};
