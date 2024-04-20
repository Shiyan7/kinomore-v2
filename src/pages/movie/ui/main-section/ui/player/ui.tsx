/* eslint-disable jsx-a11y/iframe-has-title */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import type { CSSProperties } from 'react';
import { useState } from 'react';
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
      className={styles.root}
      close={handleClose}
      isOpen={isOpen}
      style={{ '--height': `${height}px` } as CSSProperties}
    >
      <iframe
        allow="autoplay"
        allowFullScreen
        className={styles.iframe}
        onLoad={() => setIsLoading(false)}
        src={`https://api.linktodo.ws/embed/kp/${query.id}`}
      />
      <div className={clsx(styles.spinner, isLoading && styles.isLoading)}>
        <Spinner strokeWidth={3} />
      </div>
      <button className={clsx('btn-reset', styles.close)} onClick={handleClose}>
        <Icon name="common/close" />
      </button>
    </Modal>
  );
};
