import Image from "next/image";
import Link from "next/link";
import { Title } from "shared/ui/title";
import { Rating } from "shared/ui/rating";
import type { ISlide } from "./types";
import styles from "./styles.module.scss";

export const HeroSlide = ({ item }: { item: ISlide }) => {
  const { id, image, title, rating, year, genre } = item;

  return (
    <Link href={`/movie/${id}`} className={styles.item}>
      <div className={styles.content}>
        <Title className={styles.title} level="h2" size="small">
          {title}
        </Title>
        <div className={styles.bottom}>
          <Rating>{rating}</Rating>
          <span className={styles.year}>{year}</span>
          <span className={styles.genre}>{genre}</span>
        </div>
      </div>
      <Image fill quality={100} className={styles.image} src={image} alt={title} />
    </Link>
  );
};
