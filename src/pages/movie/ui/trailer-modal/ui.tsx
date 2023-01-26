import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Popup, Spinner } from 'shared/ui';
import { getTrailer } from './lib';
import styles from './styles.module.scss';

export const TrailerModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const data = useStore(pageModel.$movie);
  const trailer = getTrailer(data?.videos);
  const trailerModal = useToggler(pageModel.trailerModalToggler);

  return (
    <Popup className={styles.modal} isOpen={trailerModal.isOpen} close={trailerModal.close}>
      <div className={styles.content}>
        {data?.videos?.trailers.length ? (
          <>
            {isLoading && (
              <div className={styles.spinner}>
                <Spinner strokeWidth={2} />
              </div>
            )}
            <iframe
              onLoad={() => setIsLoading(false)}
              className={styles.iframe}
              src={trailer?.url}
              title="Трейлер"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </>
        ) : null}
      </div>
      <Popup.Close onClick={trailerModal.close} className={styles.close} />
    </Popup>
  );
};
