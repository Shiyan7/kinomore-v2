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

export const Popup = ({
  rootClassName,
  className,
  close,
  children,
  ...props
}: PopupProps) => (
  <Modal
    className={clsx(styles.modal, rootClassName)}
    close={close}
    onClick={close}
    {...props}
  >
    <div
      className={clsx(styles.container, className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </Modal>
);

const ClosePopup = ({ onClick, className }: CloseProps) => (
  <button
    className={clsx('btn-reset', styles.close, className)}
    onClick={onClick}
  >
    <Icon name="common/close" />
  </button>
);

Popup.Close = ClosePopup;
