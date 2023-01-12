import clsx from 'clsx';
import type { FC } from 'react';
import { Modal, type ModalProps } from 'shared/ui/modal';
import styles from './styles.module.scss';

export interface PopupProps extends ModalProps {
  rootClassName?: string;
}

export const Popup: FC<PopupProps> = ({ rootClassName, className, children, ...props }) => {
  return (
    <Modal className={clsx(styles.modal, rootClassName)} {...props}>
      <div onClick={(e) => e.stopPropagation()} className={clsx(styles.container, className)}>
        {children}
      </div>
    </Modal>
  );
};
