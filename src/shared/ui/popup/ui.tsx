import clsx from 'clsx';
import type { FC } from 'react';
import { Modal, type ModalProps } from 'shared/ui/modal';
import styles from './styles.module.scss';

export const Popup: FC<ModalProps> = ({ className, children, ...props }) => {
  return (
    <Modal className={styles.modal} {...props}>
      <div className={clsx(styles.container, className)}>{children}</div>
    </Modal>
  );
};
