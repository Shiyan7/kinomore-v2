import clsx from 'clsx';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { CloseIcon, Popup, Spinner } from 'shared/ui';
import styles from './styles.module.scss';

export const TrailerModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { videos } = useStore(pageModel.$movie)!;
  const trailerModal = useToggler(pageModel.trailerModalToggler);
  const firstTrailer = videos?.trailers[0];

  console.log(videos?.trailers);

  return (
    <Popup
      onClick={trailerModal.close}
      className={styles.modal}
      isOpen={trailerModal.isOpen}
      close={trailerModal.close}>
      <button onClick={trailerModal.close} className={clsx('btn-reset', styles.close)}>
        <CloseIcon />
      </button>
      <div className={styles.content}>
        {videos?.trailers.length ? (
          <>
            {isLoading && (
              <div className={styles.spinner}>
                <Spinner strokeWidth={2} />
              </div>
            )}
            <iframe
              onLoad={() => setIsLoading(false)}
              className={styles.iframe}
              src={firstTrailer?.url}
              title="Трейлер"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </>
        ) : null}
      </div>
    </Popup>
  );
};
