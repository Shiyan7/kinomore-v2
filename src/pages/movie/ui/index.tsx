import clsx from "clsx";
import type { NextPage } from "next";
import { BaseLayout } from "shared/ui/layouts";
/* import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import { pageModel } from "pages/movie";
import { Title } from "shared/ui/title"; */
import styles from "./styles.module.scss";

export const Movie: NextPage = () => {
  /* const { query } = useRouter();
  const movie = useUnit(pageModel.$movie); */

  return (
    <BaseLayout>
      <section className={styles.section}>
        <div className={clsx("container", styles.container)}>123</div>
      </section>
    </BaseLayout>
  );
};
