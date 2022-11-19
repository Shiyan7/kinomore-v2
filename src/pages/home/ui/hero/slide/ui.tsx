import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "shared/ui/title";
import { Rating } from "shared/ui/rating";
import type { ISlide } from "./types";
import styles from "./styles.module.scss";

interface SlideProps {
  item: ISlide;
}

export const HeroSlide: FC<SlideProps> = ({ item }) => {
  const { id, image, title, rating, year, genre } = item;

  return (
    <Link href={`/film/${id}`} className={styles.item}>
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
      <Image sizes="100%" fill quality={100} className={styles.image} src={image} alt={title} />
    </Link>
  );
};
