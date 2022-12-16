import type { CSSProperties } from "react";
import clsx from "clsx";
import { CloseIcon, GoogleIcon } from "shared/ui/icons";
import { useEscape, useLockedBody, useToggler } from "shared/lib/hooks";
import { authInstance } from "../model";
import { AuthForm } from "./auth-form";
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
        <div className={styles.progress} style={{ "--progress-width": `${10}%` } as CSSProperties} />
      </div>
      <div className={styles.container}>
        <div className={styles.message}>
          <span className={styles.messageTitle}>Войдите или зарегистрируйтесь</span>
          <p className={styles.messageDesc}>чтобы пользоваться сервисом на любом устройстве</p>
        </div>
        <div className={styles.content}>
          <button type="button" className={clsx("btn-reset", styles.logo)}>
            <GoogleIcon />
          </button>
          <span className={styles.sep}>или</span>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};
