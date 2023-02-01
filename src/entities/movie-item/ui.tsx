import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import type { MouseEvent } from 'react';
import type { MovieCard } from 'shared/api';
import { Button, Rating, BookmarkIcon } from 'shared/ui';
import { paths } from 'shared/routing';
import { getRating, minutesToHour } from 'shared/lib';
import styles from './styles.module.scss';

interface MovieItemProps {
  item: MovieCard;
  small?: boolean;
}

export const MovieItem = ({ item, small }: MovieItemProps) => {
  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log('add to favorites', item?.id);
  };

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
        <Rating className={styles.rating}>{getRating(item.rating)}</Rating>
        <h3 className={styles.name}>{item?.name}</h3>
        <div className={styles.info}>
          <span className={styles.year}>{item.year}</span>
          <span className={styles.length}>{minutesToHour(item.movieLength)}</span>
        </div>
        <div className={styles.btns}>
          <Button className={styles.more} as="span" variant="primary" size="small">
            Подробнее
          </Button>
          <span onClick={handleFavorite} className={styles.favorite}>
            <BookmarkIcon />
          </span>
        </div>
      </div>
    </Link>
  );
};
