import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import type { MovieItemProps } from "./types";
import styles from "./styles.module.scss";

export const MovieItem: FC<MovieItemProps> = ({ item }) => {
  const { id, name } = item;

  return (
    <Link className={styles.item} href={`/movie/${id}`}>
      <Image
        fill
        quality={100}
        className={styles.image}
        alt={name}
        src={`https://st.kp.yandex.net/images/film_iphone/iphone360_${id}.jpg`}
      />
      <div className={styles.content}>{name}</div>
    </Link>
  );
};
