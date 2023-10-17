import Image from 'next/image';
import Link from 'next/link';
import { paths } from 'shared/routing';
import { Title, MovieRating } from 'shared/ui';
import styles from './styles.module.scss';
import { HeroMovie } from './types';

interface SlideProps {
  item: HeroMovie;
}

export const HeroSlide = ({ item }: SlideProps) => {
  const { id, title, rating, year, genre, image } = item;

  return (
    <div className={styles.item}>
      <Link href={paths.movie(id)} className={styles.link} />
      <div className={styles.content}>
        <Title className={styles.title} as="h2" size="small">
          {title}
        </Title>
        <div className={styles.bottom}>
          <MovieRating className={styles.rating}>{rating}</MovieRating>
          <span className={styles.year}>{year}</span>
          <span className={styles.genre}>{genre}</span>
        </div>
      </div>
      <Image priority sizes="100%" fill quality={100} className={styles.image} src={image} alt={title} />
    </div>
  );
};
