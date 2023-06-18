import Image from 'next/image';
import Link from 'next/link';
import type { MovieEntity } from 'shared/api';
import { getRating } from 'shared/lib';
import { paths } from 'shared/routing';
import { MovieRating } from 'shared/ui/movie-rating';
import styles from './styles.module.scss';

interface SearchItemProps {
  item: MovieEntity;
}

export const SearchItem = ({ item }: SearchItemProps) => {
  const { id, name, year, rating, poster } = item;

  return (
    <li className={styles.item}>
      <Link className={styles.link} href={paths.movie(id)}>
        <div className={styles.image}>
          {poster?.previewUrl && (
            <Image sizes="100%" fill quality={100} alt={item?.name ?? ''} src={poster.previewUrl} />
          )}
        </div>
        <div className={styles.text}>
          <span className={styles.name}>{name}</span>
          <div className={styles.info}>
            <span className={styles.year}>{year}</span>
            <MovieRating size="small">{getRating(rating)}</MovieRating>
          </div>
        </div>
      </Link>
    </li>
  );
};
