import clsx from 'clsx';
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
  return (
    <Link className={clsx(styles.item, small && styles.small)} href={paths.movie(item?.id)}>
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
        {item?.rating && <Rating className={styles.rating}>{getRating(item.rating)}</Rating>}
        <h3 className={styles.name}>{item?.name}</h3>
        <div className={styles.info}>
          <span className={styles.year}>{item?.year}</span>
          {item?.movieLength && <span className={styles.length}>{minutesToHour(item.movieLength)}</span>}
        </div>
      </div>
    </Link>
  );
};
