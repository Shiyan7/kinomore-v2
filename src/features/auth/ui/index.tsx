import clsx from "clsx";
import { useEffect, useRef } from "react";
import { TransitionGroup } from "react-transition-group";
import { useStore } from "effector-react";
import { authModel } from "features/auth";
import { GoogleIcon } from "shared/ui/icons";
import { useEscape, useLockedBody, useToggler } from "shared/lib/hooks";
import { EmailForm } from "./email-form";
import { Transition } from "./transition";
import { Message } from "./message";
import { Header } from "./header";
import { PasswordForm } from "./password-form";
import styles from "./styles.module.scss";

export const AuthWindow = () => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const { close, isOpen } = useToggler(authModel.authInstance);
  const isEmailState = useStore(authModel.$isEmailState);

  useLockedBody(isOpen);

  useEscape(close);

  const EmailFormContent = (
    <div className={styles.content}>
      <Transition doneClass={styles.done} timeout={100}>
        <button type="button" className={clsx("btn-reset", styles.logo)}>
          <GoogleIcon />
        </button>
      </Transition>
      <Transition doneClass={styles.done} timeout={130}>
        <span className={styles.sep}>или</span>
      </Transition>
      <EmailForm />
    </div>
  );

  useEffect(() => {
    windowRef.current?.scrollTo(0, 0);
  }, [isEmailState]);

  return (
    <div ref={windowRef} className={clsx(styles.window, isOpen && styles.opened)}>
      <Header />
      <TransitionGroup className={styles.container}>
        <Transition doneClass={styles.done} timeout={0}>
          <Message
            className={styles.message}
            title="Войдите или зарегистрируйтесь"
            description="чтобы пользоваться сервисом на любом устройстве"
          />
        </Transition>
        {isEmailState ? EmailFormContent : <PasswordForm />}
      </TransitionGroup>
    </div>
  );
};
