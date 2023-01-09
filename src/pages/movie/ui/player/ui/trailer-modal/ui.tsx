import clsx from 'clsx';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { CloseIcon, Modal } from 'shared/ui';
import styles from './styles.module.scss';

export const TrailerModal = () => {
  const { videos } = useStore(pageModel.$movie)!;
  const { close, isOpen } = useToggler(pageModel.trailerModalInstance);
  const trailerUrl = videos?.trailers[videos?.trailers?.length - 1]?.url;

  return (
    <Modal onClick={close} className={styles.modal} isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <button onClick={close} className={clsx('btn-reset', styles.close)}>
          <CloseIcon />
        </button>
        <div className={styles.content}>
          <iframe
            className={styles.iframe}
            src={trailerUrl}
            title="Трейлер"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </Modal>
  );
};
