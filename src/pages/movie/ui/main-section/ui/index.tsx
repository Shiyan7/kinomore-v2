import clsx from 'clsx';
import { useUnit } from 'effector-react';
import type { CSSProperties } from 'react';
import { movieModel } from 'pages/movie';
import { Description } from './description';
import { GradeModal } from './grade-modal';
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
  const { movie } = useUnit({ movie: movieModel.$movie });

  return (
    <section className={styles.section}>
      <div className={styles.height} />
      {movie?.backdrop && movie.backdrop.url ? (
        <div
          className={styles.bg}
          style={
            { backgroundImage: `url(${movie.backdrop?.url})` } as CSSProperties
          }
        />
      ) : null}
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
      <GradeModal />
      <Player />
    </section>
  );
};
