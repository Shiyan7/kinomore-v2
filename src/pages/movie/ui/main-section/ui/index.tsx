import clsx from 'clsx';
import { useStore } from 'effector-react';
import { pageModel, getPageTitle } from 'pages/movie';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { getMovieBreadcrumb } from '../lib';
import { Player } from './player';
import { Info } from './info';
import { Rating } from './rating';
import { Title } from './title';
import { MainPersons } from './main-persons';
import { Description } from './description';
import styles from './styles.module.scss';

export const MainSection = () => {
  const data = useStore(pageModel.$movie);
  const breadcrumbs = [getMovieBreadcrumb(data?.type), { text: getPageTitle(data?.name) }];

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
