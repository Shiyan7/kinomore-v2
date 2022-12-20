import { FC, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";
import { authModel } from "features/auth";
import { useToggler } from "shared/lib/hooks";

interface TransitionProps {
  timeout: number;
  doneClass: string;
  inStart?: boolean;
}

export const Transition: FC<PropsWithChildren<TransitionProps>> = ({ children, doneClass, timeout, inStart }) => {
  const { isOpen } = useToggler(authModel.authInstance);

  const classNames = {
    enterDone: doneClass,
  };

  return (
    <CSSTransition classNames={classNames} timeout={timeout} in={inStart ?? isOpen}>
      {children}
    </CSSTransition>
  );
};
