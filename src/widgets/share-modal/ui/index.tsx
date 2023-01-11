import type { FC } from 'react';
import { Popup } from 'shared/ui/popup';
import styles from './styles.module.scss';

interface ShareModalProps {
  close: () => void;
  isOpen: boolean;
}

export const ShareModal: FC<ShareModalProps> = ({ close, isOpen }) => {
  return (
    <Popup onClick={close} className={styles.modal} isOpen={isOpen} close={close}>
      content
    </Popup>
  );
};
