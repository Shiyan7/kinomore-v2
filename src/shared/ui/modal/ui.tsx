import { forwardRef, PropsWithChildren } from "react";
import { useLockedBody } from "shared/lib/hooks";
import { Portal } from "../portal";
import { useEscape } from "./lib";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  close: () => void;
}

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, close, children, className }, ref) => {
    useLockedBody(isOpen);

    useEscape(close);

    return (
      <Portal rootId="#modal">
        {isOpen && (
          <div className={className} ref={ref}>
            {children}
          </div>
        )}
      </Portal>
    );
  }
);
