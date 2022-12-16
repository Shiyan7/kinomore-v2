import { useEvent, useStore } from "effector-react";
import { useState } from "react";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { $emailStore, handleEmail } from "../../model";
import styles from "./styles.module.scss";

export const AuthForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const value = useStore($emailStore);
  const onChange = useEvent(handleEmail);

  const onSubmit = () => {
    setLoading(true);

    /* FIXME! */

    setTimeout(() => {
      setLoading(false);
      onChange("");
    }, 3000);
  };

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form} action="#">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="email"
        className={styles.input}
        placeholder="Введите email"
      />
      <Button disabled={!value.length} loading={loading} type="submit">
        Продолжить
      </Button>
    </form>
  );
};
