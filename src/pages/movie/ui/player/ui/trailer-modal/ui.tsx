import clsx from 'clsx';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { CloseIcon, Modal, Spinner } from 'shared/ui';
import styles from './styles.module.scss';

export const TrailerModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { videos } = useStore(pageModel.$movie)!;
  const { close, isOpen } = useToggler(pageModel.trailerModalInstance);
  const trailerUrl = videos?.trailers[videos?.trailers?.length - 1]?.url;
  const hasTrailers = videos!.trailers.length > 0;

  return (
    <Modal onClick={close} className={styles.modal} isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <button onClick={close} className={clsx('btn-reset', styles.close)}>
          <CloseIcon />
        </button>
        <div className={styles.content}>
          {hasTrailers && (
            <>
              {isLoading && (
                <div className={styles.spinner}>
                  <Spinner strokeWidth={2} />
                </div>
              )}
              <iframe
                onLoad={() => setIsLoading(false)}
                className={styles.iframe}
                src={trailerUrl}
                title="Трейлер"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
