import { useUnit } from 'effector-react';
import { movieModel } from 'pages/movie';
import { getRating, minutesToHour, getSeasonString } from 'shared/lib';
import { MovieRating } from 'shared/ui/movie-rating';
import { getCountry, getAgeRating, getGenre } from './lib';
import styles from './styles.module.scss';

export const Info = () => {
  const { movie } = useUnit({ movie: movieModel.$movie });

  const length = movie?.seasonsInfo?.length
    ? getSeasonString(movie?.seasonsInfo.length)
    : minutesToHour(movie?.movieLength ?? 0);

  const items = [
    movie?.year,
    movie?.genres ? getGenre(movie.genres) : null,
    movie?.ageRating ? getAgeRating(movie.ageRating) : null,
    movie?.countries?.length ? getCountry(movie?.countries) : null,
    length,
  ];

  return (
    <div className={styles.root}>
      <MovieRating className={styles.rating} showState>
        {getRating(movie?.rating)}
      </MovieRating>
      {items.filter(Boolean).map((item) => (
        <span className={styles.item} key={item}>
          {item}
        </span>
      ))}
    </div>
  );
};
