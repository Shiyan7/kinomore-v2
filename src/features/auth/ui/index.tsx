import type { CSSProperties } from "react";
import clsx from "clsx";
import { CloseIcon, GoogleIcon } from "shared/ui/icons";
import { useEscape, useLockedBody, useToggler } from "shared/lib/hooks";
import { authInstance } from "../model";
import { AuthForm } from "./auth-form";
import { Transition } from "./transition";
import styles from "./styles.module.scss";

export const AuthWindow = () => {
  const { close, isOpen } = useToggler(authInstance);

  useLockedBody(isOpen);

  useEscape(close);

  return (
    <div className={clsx(styles.window, isOpen && styles.opened)}>
      <div className={styles.header}>
        <div className={styles.text}>
          <span className={styles.title}>Вход или регистрация</span>
        </div>
        <button className={clsx("btn-reset", styles.close)} type="button" onClick={close}>
          <CloseIcon />
        </button>
        <div className={styles.progress} style={{ "--progress-width": `${6}%` } as CSSProperties} />
      </div>
      <div className={styles.container}>
        <Transition doneClass={styles.done} timeout={50}>
          <div className={styles.message}>
            <span className={styles.messageTitle}>Войдите или зарегистрируйтесь</span>
            <p className={styles.messageDesc}>чтобы пользоваться сервисом на любом устройстве</p>
          </div>
        </Transition>
        <div className={styles.content}>
          <Transition doneClass={styles.done} timeout={200}>
            <button type="button" className={clsx("btn-reset", styles.logo)}>
              <GoogleIcon />
            </button>
          </Transition>
          <Transition doneClass={styles.done} timeout={230}>
            <span className={styles.sep}>или</span>
          </Transition>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};
