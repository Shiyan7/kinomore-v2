import clsx from 'clsx';
import { useStore } from 'effector-react';
import type { CSSProperties } from 'react';
import { movieModel } from 'pages/movie';
import { Description } from './description';
import { Info } from './info';
import { MainButtons } from './main-buttons';
import { MainPersons } from './main-persons';
import { MobileActions } from './mobile-actions';
import { Player } from './player';
import { ShareModal } from './share-modal';
import styles from './styles.module.scss';
import { Title } from './title';
import { TrailerModal } from './trailer-modal';

export const MainSection = () => {
  const data = useStore(movieModel.$movie);

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
