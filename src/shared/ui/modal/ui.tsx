import { forwardRef, PropsWithChildren } from "react";
import { useLockedBody } from "shared/lib/hooks";
import { useEscape } from "./model";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  close: () => void;
}

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, close, children, className }, ref) => {
    useLockedBody(isOpen);

    useEscape(close);

    /* FIXME: добавить сюда портал */

    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }
);
