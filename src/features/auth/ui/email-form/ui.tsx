import { FormEvent, useState } from "react";
import { useEvent } from "effector-react";
import { authModel } from "features/auth";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { internalApi } from "shared/api";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const EmailForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const setEmail = useEvent(authModel.setEmail);
  const setIsNewUser = useEvent(authModel.setIsNewUser);
  const setFormState = useEvent(authModel.setFormState);
  const setProgress = useEvent(authModel.setProgress);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setEmail(value);

    try {
      const { status } = await internalApi.check(value);

      setIsNewUser(status);
      setFormState("password");
      // setValue("");
      setLoading(false);
      setProgress(50);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form} action="#">
      <Transition timeout={200} doneClass={styles.done}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="email"
          className={styles.input}
          placeholder="Введите email"
        />
      </Transition>
      <Transition timeout={250} doneClass={styles.done}>
        <div className={styles.btnWrapper}>
          <Button className={styles.btn} disabled={!value.length} loading={loading} type="submit">
            Продолжить
          </Button>
        </div>
      </Transition>
    </form>
  );
};
