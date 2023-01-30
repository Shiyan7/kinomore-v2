import Link from 'next/link';
import Image from 'next/image';
import type { IMovieItem } from 'shared/api';
import { Button, Rating } from 'shared/ui';
import { paths } from 'shared/routes';
import { getRating, minutesToHour } from 'shared/lib';
import { FavoriteButton } from './favorite-button';
import styles from './styles.module.scss';

interface MovieItemProps {
  item: IMovieItem;
}

export const MovieItem = ({ item }: MovieItemProps) => {
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
        {item?.rating && <Rating className={styles.rating}>{getRating(item.rating)}</Rating>}
        <h3 className={styles.name}>{item?.name}</h3>
        <div className={styles.info}>
          {item?.year && <span className={styles.year}>{item.year}</span>}
          {item?.movieLength && <span className={styles.length}>{minutesToHour(item.movieLength)}</span>}
        </div>
        <div className={styles.btns}>
          <Button className={styles.more} as="span" variant="primary" size="small">
            Подробнее
          </Button>
          <FavoriteButton id={item?.id} />
        </div>
      </div>
    </Link>
  );
};
