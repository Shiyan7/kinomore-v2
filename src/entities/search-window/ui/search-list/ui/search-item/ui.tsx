import Image from 'next/image';
import Link from 'next/link';
import type { MovieCard } from 'shared/api';
import { getRating } from 'shared/lib';
import { paths } from 'shared/routing';
import { Rating } from 'shared/ui/rating';
import styles from './styles.module.scss';

interface SearchItemProps {
  item: MovieCard;
}

export const SearchItem = ({ item }: SearchItemProps) => {
  return (
    <li className={styles.item}>
      <Link className={styles.link} href={paths.movie(item?.id)}>
        <div className={styles.image}>
          <Image sizes="100%" fill quality={100} alt={item?.name} src={item?.poster?.previewUrl} />
        </div>
        <div className={styles.text}>
          <span className={styles.name}>{item?.name}</span>
          <div className={styles.info}>
            <span className={styles.year}>{item?.year}</span>
            <Rating size="small">{getRating(item?.rating)}</Rating>
          </div>
        </div>
      </Link>
    </li>
  );
};
