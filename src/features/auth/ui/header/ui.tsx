import clsx from "clsx";
import { useStore } from "effector-react";
import { authModel } from "features/auth";
import { useToggler } from "shared/lib/hooks";
import { CloseIcon } from "shared/ui/icons";
import { Progress } from "../progress";
import styles from "./styles.module.scss";

export const Header = () => {
  const { email } = useStore(authModel.authForm.$values);
  const { close } = useToggler(authModel.authInstance);
  const isEmailState = useStore(authModel.$isEmailState);
  const isNewUser = useStore(authModel.$isNewUser);

  return (
    <div className={styles.header}>
      {isEmailState ? (
        <span className={styles.title}>Вход или регистрация</span>
      ) : (
        <div className={styles.text}>
          <span className={styles.title}>{isNewUser ? "Новый пользователь" : "Здравствуйте"}</span>
          <span className={styles.email}>{email}</span>
        </div>
      )}
      <button className={clsx("btn-reset", styles.close)} type="button" onClick={close}>
        <CloseIcon />
      </button>
      <Progress />
    </div>
  );
};
