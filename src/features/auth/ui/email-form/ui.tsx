import { FormEvent, useEffect, useRef, useState } from "react";
import { useEvent, useStore } from "effector-react";
import { authModel } from "features/auth";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { internalApi } from "shared/api";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const EmailForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputValue = useStore(authModel.$inputValue);
  const setInputValue = useEvent(authModel.setInputValue);
  const setEmail = useEvent(authModel.setEmail);
  const setIsNewUser = useEvent(authModel.setIsNewUser);
  const setIsEmailState = useEvent(authModel.setIsEmailState);
  const setProgress = useEvent(authModel.setProgress);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setEmail(inputValue);

    try {
      const { status } = await internalApi.check(inputValue);

      setIsNewUser(status);

      setTimeout(() => {
        setIsEmailState(false);
        setInputValue("");
        setLoading(false);
        setProgress(50);
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form} action="#">
      <Transition timeout={200} doneClass={styles.done}>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="email"
          className={styles.input}
          placeholder="Введите email"
        />
      </Transition>
      <Transition timeout={250} doneClass={styles.done}>
        <div className={styles.btnWrapper}>
          <Button className={styles.btn} disabled={!inputValue.length} loading={loading} type="submit">
            Продолжить
          </Button>
        </div>
      </Transition>
    </form>
  );
};
