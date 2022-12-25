import clsx from "clsx";
import { useEffect, useRef } from "react";
import { TransitionGroup } from "react-transition-group";
import { useUnit } from "effector-react";
import { authModel } from "features/auth";
import { Modal } from "shared/ui/modal";
import { useToggler } from "shared/lib/hooks";
import { EmailForm } from "./email-form";
import { Transition } from "./transition";
import { Message } from "./message";
import { Header } from "./header";
import { PasswordForm } from "./password-form";
import styles from "./styles.module.scss";

export const AuthWindow = () => {
  const { close, isOpen } = useToggler(authModel.authInstance);
  const windowRef = useRef<HTMLDivElement>(null);
  const state = useUnit(authModel.$state);
  const isEmailState = state === "email";

  useEffect(() => {
    windowRef.current?.scrollTo(0, 0);
  }, [isEmailState]);

  return (
    <Modal isOpen={isOpen} close={close} ref={windowRef} className={clsx(styles.window, isOpen && styles.opened)}>
      <Header />
      <TransitionGroup className={styles.container}>
        <Transition doneClass={styles.done} timeout={0}>
          <Message
            className={styles.message}
            title="Войдите или зарегистрируйтесь"
            description={isEmailState ? "чтобы пользоваться сервисом на любом устройстве" : null}
          />
        </Transition>
        {isEmailState ? <EmailForm /> : <PasswordForm />}
      </TransitionGroup>
    </Modal>
  );
};
