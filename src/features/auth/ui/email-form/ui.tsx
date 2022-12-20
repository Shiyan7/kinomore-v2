import clsx from "clsx";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useEvent, useStore } from "effector-react";
import { authModel } from "features/auth";
import { GoogleIcon } from "shared/ui/icons";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { internalApi } from "shared/api";
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const EmailForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
      setIsEmailState(false);
      setInputValue("");
      setLoading(false);
      setProgress(50);
    } catch (e) {
      console.error(e);
    }
  };

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
    </div>
  );
};
