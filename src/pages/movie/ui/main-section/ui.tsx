import clsx from 'clsx';
import { useStore } from 'effector-react';
import { pageModel, getGenre, getMovieBreadcrumb } from 'pages/movie';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { Player } from '../player';
import { Info } from '../info';
import { MainPersons } from '../main-persons';
import { Description } from '../description';
import { Rating } from '../rating';
import { Title } from '../title';
import styles from './styles.module.scss';

export const MainSection = () => {
  const { genres, type } = useStore(pageModel.$movie)!;
  const breadcrumbs = [getMovieBreadcrumb(type), getGenre(genres)];

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
        <div className={styles.mobile}>
          <Title />
          <Info />
        </div>
        <div className={styles.content}>
          <Player />
          <div className={styles.info}>
            <div className={styles.desktop}>
              <Title />
              <Info />
            </div>
            <MainPersons />
            <Description />
            <Rating />
          </div>
        </div>
      </div>
    </section>
  );
};