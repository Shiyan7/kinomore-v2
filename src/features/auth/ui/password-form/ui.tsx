import clsx from "clsx";
import type { FormEvent } from "react";
import { useEvent, useStore } from "effector-react";
import { authModel } from "features/auth";
import { Button } from "shared/ui/button";
import { EditIcon } from "shared/ui/icons";
import { Input } from "shared/ui/input";
import { Message } from "../message";
import styles from "./styles.module.scss";

export const PasswordForm = () => {
  const email = useStore(authModel.$emailStore);
  const isNewUser = useStore(authModel.$isNewUser);
  const setFormState = useEvent(authModel.setFormState);
  const setProgress = useEvent(authModel.setProgress);

  const handleEditEmail = () => {
    setFormState("email");
    setProgress(6);
  };

  const Chat = (
    <>
      <div className={styles.message}>
        <button onClick={handleEditEmail} className={clsx("btn-reset", styles.edit)}>
          <EditIcon />
        </button>
        <Message right title={email} />
      </div>
      <Message
        title={isNewUser ? "Придумайте пароль для входа" : "Введите пароль, чтобы войти"}
        description={isNewUser ? "Установите пароль для входа, минимум 6 символов" : ""}
      />
    </>
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  const Form = (
    <form onSubmit={onSubmit} noValidate className={styles.form} action="#">
      <Input className={styles.input} placeholder={isNewUser ? "Придумайте пароль" : "Введите пароль"} />
      <Button>{isNewUser ? "Продолжить" : "Войти"}</Button>
    </form>
  );

  return (
    <>
      {Chat}
      {Form}
    </>
  );
};
