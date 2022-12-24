import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import { authModel } from "features/auth";
import { useForm } from "shared/lib/effector-react-form";
import { Form, Field } from "shared/form";
import { GoogleIcon } from "shared/ui/icons";
import { Button } from "shared/ui/button";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const EmailForm = () => {
  const { controller } = useForm({ form: authModel.authForm, resetUnmount: false });
  const inputRef = useRef<HTMLInputElement>(null);
  const { email } = useUnit(authModel.authForm.$values);
  const pending = useUnit(authModel.checkUserFx.pending);
  const checkUserFx = useUnit(authModel.checkUserFx);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.content}>
      <Transition doneClass={styles.done} timeout={100}>
        <button type="button" className={clsx("btn-reset", styles.logo)}>
          <GoogleIcon />
        </button>
      </Transition>
      <Transition doneClass={styles.done} timeout={130}>
        <span className={styles.sep}>или</span>
      </Transition>
      <Form onSubmit={() => checkUserFx(email)} className={styles.form}>
        <Transition timeout={200} doneClass={styles.done}>
          <Field.Input
            use={controller({
              name: "email",
            })}
            ref={inputRef}
            type="email"
            className={styles.input}
            placeholder="Введите email"
          />
        </Transition>
        <Transition timeout={250} doneClass={styles.done}>
          <div className={styles.btnWrapper}>
            <Button className={styles.btn} disabled={!email} loading={pending} type="submit">
              Продолжить
            </Button>
          </div>
        </Transition>
      </Form>
    </div>
  );
};
