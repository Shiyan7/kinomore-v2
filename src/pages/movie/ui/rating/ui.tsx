import clsx from "clsx";
import { useUnit } from "effector-react";
import { pageModel, getVotes, getMovieType } from "pages/movie";
import { getRating } from "shared/lib/get-rating";
import styles from "./styles.module.scss";

export const Rating = () => {
  const { rating, votes, type } = useUnit(pageModel.$movie)!;

  return (
    <div className={styles.container}>
      <div className={styles.rating}>{getRating(rating)}</div>
      <div className={styles.right}>
        <div className={styles.text}>
          <span className={styles.caption}>Рейтинг {getMovieType(type)}</span>
          <span className={styles.desc}>{getVotes(votes)} оценок</span>
        </div>
        <button className={clsx("btn-reset", styles.btn)}>Оценить</button>
      </div>
    </div>
  );
};
