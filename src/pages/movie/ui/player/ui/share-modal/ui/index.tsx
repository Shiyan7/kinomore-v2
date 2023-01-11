import clsx from 'clsx';
import type { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CloseIcon, LinkIcon } from 'shared/ui/icons';
import { Popup } from 'shared/ui/popup';
import { Info } from './info';
import styles from './styles.module.scss';

interface ShareModalProps {
  close: () => void;
  isOpen: boolean;
}

export const ShareModal: FC<ShareModalProps> = ({ close, isOpen }) => {
  return (
    <CSSTransition in={isOpen} timeout={0} classNames={{ enterDone: styles.done }}>
      <Popup onClick={close} className={styles.modal} isOpen={isOpen} close={close}>
        <Info />
        <div className={styles.content}>
          <button className={clsx('btn-reset', styles.btn)}>
            <span>Скопировать ссылку</span>
            <LinkIcon />
          </button>
          <button className={clsx('btn-reset', styles.btn)}>
            <span>WhatsApp</span>
            <LinkIcon />
          </button>
          <button className={clsx('btn-reset', styles.btn)}>
            <span>Telegram</span>
            <LinkIcon />
          </button>
          <button className={clsx('btn-reset', styles.btn)}>
            <span>Viber</span>
            <LinkIcon />
          </button>
        </div>
        <button onClick={close} className={clsx('btn-reset', styles.close)}>
          <CloseIcon />
        </button>
        <div onClick={close} className={styles.shape} />
      </Popup>
    </CSSTransition>
  );
};
