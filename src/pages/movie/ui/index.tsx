import clsx from 'clsx';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { pageModel, getGenre, getMovieBreadcrumb } from 'pages/movie';
import { Breadcrumbs, Title } from 'shared/ui';
import { Player } from './player';
import { Info } from './info';
import { MainPersons } from './main-persons';
import { Description } from './description';
import styles from './styles.module.scss';
import { Rating } from './rating';

export const Movie: NextPage = () => {
  const { genres, type, name } = useStore(pageModel.$movie)!;
  const breadcrumbs = [getMovieBreadcrumb(type), getGenre(genres)];

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
        <div className={styles.mobile}>
          <Title className={styles.title}>
            <span>{name} Смотреть онлайн</span>
          </Title>
          <Info />
        </div>
        <div className={styles.wrapper}>
          <Player />
          <div className={styles.info}>
            <div className={styles.desktop}>
              <Title className={styles.title}>
                <span>{name} Смотреть онлайн</span>
              </Title>
              <Info />
            </div>
            <div className={styles.content}>
              <MainPersons />
              <Description />
              <Rating />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
