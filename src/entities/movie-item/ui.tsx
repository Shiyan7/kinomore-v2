import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import type { MovieItemProps } from "./types";
import styles from "./styles.module.scss";

export const MovieItem: FC<MovieItemProps> = ({ item }) => {
  const { id, name } = item;

  console.log(item);

  return (
    <Link className={styles.item} href={`/film/${id}`}>
      <Image
        sizes="100%"
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
