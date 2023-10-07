/* eslint-disable jsx-a11y/iframe-has-title */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { CSSProperties, useState } from 'react';
import { movieModel } from 'pages/movie';
import { useToggler } from 'shared/lib';
import { Modal, Spinner, Icon } from 'shared/ui';
import { useWindowSize } from './lib';
import styles from './styles.module.scss';

export const Player = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isOpen, close } = useToggler(movieModel.playerToggler);
  const { query } = useRouter();
  const { height } = useWindowSize();

  const handleClose = () => {
    setIsLoading(true);
    close();
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      style={{ '--height': `${height}px` } as CSSProperties}
      className={styles.root}
    >
      <iframe
        onLoad={() => setIsLoading(false)}
        src={`https://voidboost.net/embed/${query.id}?poster=1&poster_id=4&df=1`}
        allow="autoplay"
        className={styles.iframe}
        allowFullScreen
      />
      <div className={clsx(styles.spinner, isLoading && styles.isLoading)}>
        <Spinner strokeWidth={3} />
      </div>
      <button onClick={handleClose} className={clsx('btn-reset', styles.close)}>
        <Icon type="common" name="close" />
      </button>
    </Modal>
  );
};
