import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import { authModel } from "features/auth";
import { useForm } from "shared/lib/effector-react-form";
import { Form, Field } from "shared/form";
import { GoogleIcon } from "shared/ui/icons";
import { Button } from "shared/ui/button";
import styles from "./styles.module.scss";

export const EmailForm = () => {
  const { controller, handleSubmit } = useForm({ form: authModel.emailForm, resetUnmount: false });
  const { email } = useUnit(authModel.emailForm.$values);
  const inputRef = useRef<HTMLInputElement>(null);
  const pending = useUnit(authModel.checkUserFx.pending);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.content}>
      <button type="button" className={clsx("btn-reset", styles.logo)}>
        <GoogleIcon />
      </button>
      <span className={styles.sep}>или</span>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Field.Input
          use={controller({
            name: "email",
          })}
          ref={inputRef}
          type="email"
          className={styles.input}
          placeholder="Введите email"
        />
        <div className={styles.btnWrapper}>
          <Button className={styles.btn} disabled={!email} loading={pending} type="submit">
            Продолжить
          </Button>
        </div>
      </Form>
    </div>
  );
};
