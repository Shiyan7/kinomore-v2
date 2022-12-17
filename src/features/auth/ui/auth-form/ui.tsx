import { FormEvent, useState } from "react";
import { useEvent, useStore } from "effector-react";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { $emailStore, handleEmail } from "../../model";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const AuthForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const value = useStore($emailStore);
  const onChange = useEvent(handleEmail);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    /* FIXME! */

    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onChange("");
    }, 3000);
  };

  return (
    <Transition timeout={250} doneClass={styles.done}>
      <form onSubmit={onSubmit} noValidate className={styles.form} action="#">
        <Transition timeout={300} doneClass={styles.done}>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="email"
            className={styles.input}
            placeholder="Введите email"
          />
        </Transition>
        <Transition timeout={300} doneClass={styles.done}>
          <Button className={styles.btn} disabled={!value.length} loading={loading} type="submit">
            Продолжить
          </Button>
        </Transition>
      </form>
    </Transition>
  );
};
