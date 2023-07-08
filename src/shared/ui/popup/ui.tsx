import clsx from 'clsx';
import { Icon } from 'shared/ui/icon';
import { Modal, type ModalProps } from 'shared/ui/modal';
import styles from './styles.module.scss';

export interface PopupProps extends ModalProps {
  rootClassName?: string;
}

interface CloseProps {
  onClick: () => void;
  className?: string;
}

export const Popup = ({ rootClassName, className, close, children, ...props }: PopupProps) => (
  <Modal onClick={close} close={close} className={clsx(styles.modal, rootClassName)} {...props}>
    <div onClick={(e) => e.stopPropagation()} className={clsx(styles.container, className)}>
      {children}
    </div>
  </Modal>
);

const ClosePopup = ({ onClick, className }: CloseProps) => (
  <button onClick={onClick} className={clsx('btn-reset', styles.close, className)}>
    <Icon type="common" name="close" />
  </button>
);

Popup.Close = ClosePopup;
