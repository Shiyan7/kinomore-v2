import React, { FC, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";
import { useToggler } from "shared/lib/hooks";
import { authInstance } from "../../model";

interface TransitionProps {
  timeout: number;
  doneClass: string;
}

export const Transition: FC<PropsWithChildren<TransitionProps>> = ({ children, doneClass, timeout }) => {
  const { isOpen } = useToggler(authInstance);

  const classNames = {
    enterDone: doneClass,
  };

  return (
    <CSSTransition classNames={classNames} timeout={timeout} in={isOpen}>
      {children}
    </CSSTransition>
  );
};
