import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import type { IMovieItem } from "shared/api";
import styles from "./styles.module.scss";

interface MovieItemProps {
  item: IMovieItem;
}

export const MovieItem: FC<MovieItemProps> = ({ item }) => {
  return (
    <Link className={styles.item} href={`/film/${item?.id}`}>
      <Image
        sizes="100%"
        fill
        quality={100}
        className={styles.image}
        alt={item?.name}
        src={item?.id ? `https://st.kp.yandex.net/images/film_iphone/iphone360_${item?.id}.jpg` : ""}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{item?.name}</h3>
      </div>
    </Link>
  );
};
