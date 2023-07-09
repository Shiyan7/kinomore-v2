import clsx from 'clsx';
import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useLockedBody } from 'shared/lib/modal';
import { Portal } from 'shared/ui/portal';
import { useEscape } from './lib';
import styles from './styles.module.scss';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, close, children, className, ...props }, ref) => {
    useLockedBody(isOpen);

    useEscape(close);

    return (
      <CSSTransition
        in={isOpen}
        timeout={0}
        classNames={{
          enterDone: styles.done,
        }}
      >
        <Portal rootId="#modal">
          {isOpen && (
            <div className={clsx(styles.modal, className)} ref={ref} {...props}>
              {children}
            </div>
          )}
        </Portal>
      </CSSTransition>
    );
  },
);
