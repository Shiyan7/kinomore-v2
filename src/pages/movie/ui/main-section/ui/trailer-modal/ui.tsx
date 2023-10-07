import { useStore } from 'effector-react';
import { useState } from 'react';
import { movieModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Popup, Spinner } from 'shared/ui';
import { getTrailer } from './lib';
import styles from './styles.module.scss';

export const TrailerModal = () => {
  const { close, isOpen } = useToggler(movieModel.trailerToggler);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const data = useStore(movieModel.$movie);
  const trailer = getTrailer(data?.videos);

  return (
    <Popup className={styles.modal} isOpen={isOpen} close={close}>
      <div className={styles.content}>
        {data?.videos?.trailers?.length ? (
          <>
            {isLoading && (
              <div className={styles.spinner}>
                <Spinner strokeWidth={2} />
              </div>
            )}
            <iframe
              onLoad={() => setIsLoading(false)}
              className={styles.iframe}
              src={`${trailer?.url}?autoplay=1`}
              title="Трейлер"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </>
        ) : null}
      </div>
      <Popup.Close onClick={close} className={styles.close} />
    </Popup>
  );
};
