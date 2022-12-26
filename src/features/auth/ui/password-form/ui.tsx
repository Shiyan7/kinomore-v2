import { useRef, useEffect } from "react";
import { useUnit } from "effector-react";
import { authModel } from "features/auth";
import { useForm } from "shared/lib/effector-react-form";
import { Button } from "shared/ui/button";
import { Field, Form } from "shared/form";
import { Message } from "../message";
import styles from "./styles.module.scss";

export const PasswordForm = () => {
  const { handleSubmit, controller } = useForm({ form: authModel.passwordForm, resetUnmount: false });
  const { email } = useUnit(authModel.emailForm.$values);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNewUser = useUnit(authModel.$isNewUser);
  const editClicked = useUnit(authModel.editClicked);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Message className={styles.message} isEditable onEdit={editClicked} title={email} />
      <Message
        className={styles.message}
        title={isNewUser ? "Придумайте пароль для входа" : "Введите пароль, чтобы войти"}
        description={isNewUser ? "Установите пароль для входа, минимум 6 символов" : ""}
      />
      <Form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <Field.Input
            use={controller({
              name: "password",
            })}
            ref={inputRef}
            type="password"
            className={styles.input}
            placeholder={isNewUser ? "Придумайте пароль" : "Введите пароль"}
          />
        </div>
        <Button className={styles.btn} type="submit">
          {isNewUser ? "Зарегистрироваться" : "Войти"}
        </Button>
      </Form>
    </>
  );
};
