import { useEvent, useStore } from "effector-react";
import { authModel } from "features/auth";
import { useForm } from "shared/lib/effector-react-form";
import { Button } from "shared/ui/button";
import { Field, Form } from "shared/form";
import { Message } from "../message";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const PasswordForm = () => {
  const { handleSubmit, controller } = useForm({ form: authModel.authForm, resetUnmount: false });
  const { email } = useStore(authModel.authForm.$values);
  const isNewUser = useStore(authModel.$isNewUser);
  const editEmail = useEvent(authModel.editEmail);

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
      <Form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <Transition doneClass={styles.done} timeout={150}>
            <Field.Input
              use={controller({
                name: "password",
              })}
              type="password"
              className={styles.input}
              placeholder={isNewUser ? "Придумайте пароль" : "Введите пароль"}
            />
          </Transition>
        </div>
        <Transition doneClass={styles.done} timeout={170}>
          <Button className={styles.btn} type="submit">
            {isNewUser ? "Зарегистрироваться" : "Войти"}
          </Button>
        </Transition>
      </Form>
    </>
  );
};
