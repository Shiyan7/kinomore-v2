import Image from 'next/image';
import Link from 'next/link';
import { paths } from 'shared/routing';
import { Title, MovieRating } from 'shared/ui';
import styles from './styles.module.scss';
import type { HeroMovie } from './types';

interface SlideProps {
  item: HeroMovie;
}

export const HeroSlide = ({ item }: SlideProps) => {
  const { id, title, rating, year, genre, image } = item;

  return (
    <div className={styles.item}>
      <Link className={styles.link} href={paths.movie(id)} />
      <div className={styles.content}>
        <Title as="h2" className={styles.title} size="small">
          {title}
        </Title>
        <div className={styles.bottom}>
          <MovieRating className={styles.rating}>{rating}</MovieRating>
          <span className={styles.year}>{year}</span>
          <span className={styles.genre}>{genre}</span>
        </div>
      </div>
      <Image
        alt={title}
        className={styles.image}
        fill
        priority
        quality={100}
        sizes="100%"
        src={image}
      />
    </div>
  );
};
