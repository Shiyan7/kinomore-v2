import clsx from "clsx";
import type { NextPage } from "next";
import { useUnit } from "effector-react";
import { pageModel } from "pages/movie";
import styles from "./styles.module.scss";

export const Movie: NextPage = () => {
  const movie = useUnit(pageModel.$movie);

  console.log(movie);

  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.container)}>{movie?.name}</div>
    </section>
  );
};
