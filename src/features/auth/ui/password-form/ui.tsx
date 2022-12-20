import type { FormEvent } from "react";
import { useEvent, useStore } from "effector-react";
import { authModel } from "features/auth";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { Message } from "../message";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const PasswordForm = () => {
  const email = useStore(authModel.$emailStore);
  const isNewUser = useStore(authModel.$isNewUser);
  const setIsEmailState = useEvent(authModel.setIsEmailState);
  const setProgress = useEvent(authModel.setProgress);

  const editEmail = () => {
    setIsEmailState(true);
    setProgress(6);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <>
      <Transition doneClass={styles.done} timeout={50}>
        <Message className={styles.message} isEditable onEdit={editEmail} title={email} />
      </Transition>
      <Transition doneClass={styles.done} timeout={80}>
        <Message
          className={styles.message}
          title={isNewUser ? "Придумайте пароль для входа" : "Введите пароль, чтобы войти"}
          description={isNewUser ? "Установите пароль для входа, минимум 6 символов" : ""}
        />
      </Transition>
      <form onSubmit={onSubmit} noValidate className={styles.form} action="#">
        <Transition doneClass={styles.done} timeout={150}>
          <Input className={styles.input} placeholder={isNewUser ? "Придумайте пароль" : "Введите пароль"} />
        </Transition>
        <Transition doneClass={styles.done} timeout={170}>
          <Button className={styles.btn}>{isNewUser ? "Продолжить" : "Войти"}</Button>
        </Transition>
      </form>
    </>
  );
};
