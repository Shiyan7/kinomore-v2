import clsx from "clsx";
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
  const { close, isOpen } = useToggler(authModel.authInstance);
  const state = useStore(authModel.$formState);
  const isEmailState = state === "email";

  useLockedBody(isOpen);

  useEscape(close);

  const EmailFormContent = (
    <>
      <Transition doneClass={styles.done} timeout={200}>
        <button type="button" className={clsx("btn-reset", styles.logo)}>
          <GoogleIcon />
        </button>
      </Transition>
      <Transition doneClass={styles.done} timeout={230}>
        <span className={styles.sep}>или</span>
      </Transition>
      <EmailForm />
    </>
  );

  return (
    <div className={clsx(styles.window, isOpen && styles.opened)}>
      <Header />
      <div className={styles.container}>
        <Message title="Войдите или зарегистрируйтесь" description="чтобы пользоваться сервисом на любом устройстве" />
        <TransitionGroup className={styles.content}>
          {isEmailState ? EmailFormContent : <PasswordForm />}
        </TransitionGroup>
      </div>
    </div>
  );
};
