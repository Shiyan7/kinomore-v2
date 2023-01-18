import clsx from 'clsx';
import { Modal, type ModalProps } from 'shared/ui/modal';
import { CloseIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export interface PopupProps extends ModalProps {
  rootClassName?: string;
}

interface CloseProps {
  onClick: () => void;
  className?: string;
}

export const Popup = ({ rootClassName, className, close, children, ...props }: PopupProps) => {
  return (
    <Modal onClick={close} close={close} className={clsx(styles.modal, rootClassName)} {...props}>
      <div onClick={(e) => e.stopPropagation()} className={clsx(styles.container, className)}>
        {children}
      </div>
    </Modal>
  );
};

const ClosePopup = ({ onClick, className }: CloseProps) => {
  return (
    <button onClick={onClick} className={clsx('btn-reset', styles.close, className)}>
      <CloseIcon />
    </button>
  );
};

Popup.Close = ClosePopup;
