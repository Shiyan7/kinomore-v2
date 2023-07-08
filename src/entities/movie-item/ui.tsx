import Image from 'next/image';
import Link from 'next/link';
import type { MovieEntity, Rating } from 'shared/api';
import { getRating, minutesToHour } from 'shared/lib';
import { paths } from 'shared/routing';
import { MovieRating } from 'shared/ui/movie-rating';
import styles from './styles.module.scss';

interface MovieItemProps {
  item: Partial<MovieEntity>;
  rating?: number | null;
  small?: boolean;
}

export const MovieItem = ({ item, rating, small }: MovieItemProps) => {
  const movieRating = Number(rating ?? getRating(item?.rating as Rating)).toFixed(1);

  return (
    <Link className={styles.item} href={paths.movie(item?.id)}>
      <div className={styles.imageWrapper}>
        {item?.id && (
          <Image
            sizes="100%"
            fill
            quality={100}
            className={styles.image}
            alt={item?.name ?? ''}
            src={`https://st.kp.yandex.net/images/film_iphone/iphone360_${item?.id}.jpg`}
          />
        )}
      </div>
      <div className={styles.content}>
        {movieRating ? <MovieRating className={styles.rating}>{movieRating}</MovieRating> : null}
        <h3 className={styles.name}>{item?.name}</h3>
        {!small && (
          <div className={styles.info}>
            <span className={styles.year}>{item?.year}</span>
            {item?.movieLength && <span className={styles.length}>{minutesToHour(item.movieLength)}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};
