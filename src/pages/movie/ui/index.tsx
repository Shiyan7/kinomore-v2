import clsx from "clsx";
import type { NextPage } from "next";
import { useStore } from "effector-react/scope";
import { pageModel } from "pages/movie";
/* import { useStore } from "effector-react/scope";÷
import { useRouter } from "next/router";
import { pageModel } from "pages/movie";
import { Title } from "shared/ui/title"; */
import styles from "./styles.module.scss";

export const Movie: NextPage = () => {
	const movie = useStore(pageModel.$movie);
	console.log("MOVIE", movie);
  /* const { query } = useRouter();
  const movie = useStore(pageModel.$movie); */

  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.container)}>{movie?.name}</div>
    </section>
  );
};
