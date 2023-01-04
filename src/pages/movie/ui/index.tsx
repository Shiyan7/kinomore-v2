import clsx from "clsx";
import type { NextPage } from "next";
import { useUnit } from "effector-react";
import { pageModel, getGenre, getMovieType } from "pages/movie";
import { Breadcrumbs } from "shared/ui/breadcrumbs";
import { Player } from "./player";
import { Info } from "./info";
import styles from "./styles.module.scss";

export const Movie: NextPage = () => {
  const { genres, type } = useUnit(pageModel.$movie)!;
  const breadcrumbs = [getMovieType(type), getGenre(genres)];

  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.container)}>
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
        <div className={styles.content}>
          <Player />
          <Info />
        </div>
      </div>
    </section>
  );
};
