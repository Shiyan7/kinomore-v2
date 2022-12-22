import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IMovieItem } from "shared/api";
import styles from "./styles.module.scss";

interface SearchItemProps {
  item: IMovieItem;
}

export const SearchItem: FC<SearchItemProps> = ({ item }) => {
  return (
    <li className={styles.item}>
      <Link className={styles.link} href={`/film/${item?.id}`}>
        <div className={styles.image}>
          <Image
            sizes="100%"
            fill
            quality={100}
            alt={item?.name}
            src={`https://st.kp.yandex.net/images/film_iphone/iphone360_${item?.id}.jpg`}
          />
        </div>
        <div className={styles.text}>
          <span className={styles.name}>{item.name}</span>
          <div className={styles.info}>
            <span className={styles.year}>{item.year}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};
