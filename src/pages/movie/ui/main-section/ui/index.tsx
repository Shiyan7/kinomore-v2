import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { Info } from './info';
import { MainPersons } from './main-persons';
import { MainButtons } from './main-buttons';
import { MobileActions } from './mobile-actions';
import { TrailerModal } from './trailer-modal';
import { ShareModal } from './share-modal';
import { Description } from './description';
import { Title } from './title';
import { Player } from './player';
import styles from './styles.module.scss';

export const MainSection = () => {
  const data = useStore(pageModel.$movie);

  return (
    <section className={styles.section}>
      <div className={styles.height} />
      <div style={{ backgroundImage: `url(${data?.backdrop?.url})` } as CSSProperties} className={styles.bg} />
      <div className={clsx('container', styles.container)}>
        <div className={styles.content}>
          <Title />
          <Info />
          <Description />
          <MainPersons />
          <MainButtons />
          <MobileActions />
        </div>
      </div>
      <TrailerModal />
      <ShareModal />
      <Player />
    </section>
  );
};
