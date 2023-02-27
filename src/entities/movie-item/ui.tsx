import Link from 'next/link';
import Image from 'next/image';
import type { MovieCard } from 'shared/api';
import { Rating } from 'shared/ui/rating';
import { paths } from 'shared/routing';
import { getRating, minutesToHour } from 'shared/lib';
import styles from './styles.module.scss';

interface MovieItemProps {
  item: MovieCard;
  small?: boolean;
}

export const MovieItem = ({ item, small }: MovieItemProps) => {
  const numberRating = item?.rating as number | undefined;

  return (
    <Link className={styles.item} href={paths.movie(item?.id)}>
      <div className={styles.imageWrapper}>
        <Image
          sizes="100%"
          fill
          quality={100}
          className={styles.image}
          alt={item?.name}
          src={`https://st.kp.yandex.net/images/film_iphone/iphone360_${item?.id}.jpg`}
        />
      </div>
      <div className={styles.content}>
        <Rating className={styles.rating}>{small ? numberRating?.toFixed(1) : getRating(item.rating)}</Rating>
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
