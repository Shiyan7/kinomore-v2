import Image from 'next/image';
import Link from 'next/link';
import type { SearchMovieEntity } from 'shared/api/types';
import { paths } from 'shared/routing';
import { MovieRating } from 'shared/ui/movie-rating';
import styles from './styles.module.scss';

interface SearchItemProps {
  item: SearchMovieEntity;
}

export const SearchItem = ({ item }: SearchItemProps) => {
  const { id, name, year, rating, poster } = item;

  return (
    <li className={styles.item}>
      <Link className={styles.link} href={paths.movie(id)}>
        <div className={styles.image}>
          {poster ? (
            <Image
              alt={item?.name ?? ''}
              fill
              quality={100}
              sizes="100%"
              src={poster}
            />
          ) : null}
        </div>
        <div className={styles.text}>
          <span className={styles.name}>{name}</span>
          <div className={styles.info}>
            <span className={styles.year}>{year}</span>
            <MovieRating size="small">{rating.toFixed(1)}</MovieRating>
          </div>
        </div>
      </Link>
    </li>
  );
};
