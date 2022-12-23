import clsx from "clsx";
import type { NextPage } from "next";
/* import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { pageModel } from "pages/movie";
import { Title } from "shared/ui/title"; */
import styles from "./styles.module.scss";

export const Movie: NextPage = () => {
  /* const { query } = useRouter();
  const movie = useStore(pageModel.$movie); */

  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.container)}>123</div>
    </section>
  );
};
