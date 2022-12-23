import clsx from "clsx";
import type { NextPage } from "next";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { pageModel } from "pages/movie";
import { Title } from "shared/ui/title";
import styles from "./styles.module.scss";

export const Movie: NextPage = () => {
  const { query } = useRouter();
  const movie = useStore(pageModel.$movie);

  return (
    <section className={styles.section}>
      <div className={styles.playerWrapper}>
        <iframe
          title="Плеер"
          className={styles.player}
          src={`https://voidboost.net/embed/${query.id}?poster=1&poster_id=4&df=1`}
          allow="autoplay"
          allowFullScreen
        />
      </div>
      <div className={clsx("container", styles.container)}>
        <Title as="h1" size="medium" className={styles.title}>
          {movie?.name} ({movie?.year})
        </Title>
        <p className={styles.desc}>{movie?.description}</p>
      </div>
    </section>
  );
};
