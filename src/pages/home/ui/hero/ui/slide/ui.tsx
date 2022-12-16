import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "shared/ui/title";
import { Rating } from "shared/ui/rating";
import type { Slide } from "./types";
import styles from "./styles.module.scss";

interface SlideProps {
  item: Slide;
}

export const HeroSlide: FC<SlideProps> = ({ item }) => {
  return (
    <Link href={`/film/${item?.id}`} className={styles.item}>
      <div className={styles.content}>
        <Title className={styles.title} as="h2" size="small">
          {item?.title}
        </Title>
        <div className={styles.bottom}>
          <Rating className={styles.rating}>{item?.rating}</Rating>
          <span className={styles.year}>{item?.year}</span>
          <span className={styles.genre}>{item?.genre}</span>
        </div>
      </div>
      <Image priority sizes="100%" fill quality={100} className={styles.image} src={item?.image} alt={item?.title} />
    </Link>
  );
};
