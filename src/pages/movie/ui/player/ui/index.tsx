import { useRouter } from 'next/router';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { DesktopActions } from './desktop-actions';
import { MobileActions } from './mobile-actions';
import { TrailerModal } from './trailer-modal';
import { ShareModal } from './share-modal';
import styles from './styles.module.scss';

export const Player = () => {
  const { query } = useRouter();
  const shareModal = useToggler(pageModel.shareModalToggler);

  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
        <div className={styles.player}>
          <iframe
            title="Плеер"
            src={`https://voidboost.net/embed/${query.id}?poster=1&poster_id=4&df=1`}
            allow="autoplay"
            className={styles.iframe}
            allowFullScreen
          />
        </div>
        <DesktopActions />
        <MobileActions />
      </div>
      <TrailerModal />
      <ShareModal close={shareModal.close} isOpen={shareModal.isOpen} />
    </div>
  );
};
