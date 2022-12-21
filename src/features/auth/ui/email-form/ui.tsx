import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useForm } from "effector-react-form";
import { authModel } from "features/auth";
import { Form, Field } from "shared/form";
import { GoogleIcon } from "shared/ui/icons";
import { Button } from "shared/ui/button";
/* import { Input } from "shared/ui/input";
import { internalApi } from "shared/api"; */
import { Transition } from "../transition";
import styles from "./styles.module.scss";

export const EmailForm = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { controller, handleSubmit } = useForm({ form: authModel.emailForm });

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
      <Form onSubmit={handleSubmit} className={styles.form}>
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
            <Button className={styles.btn} /* disabled={!inputValue.length} */ type="submit">
              Продолжить
            </Button>
          </div>
        </Transition>
      </Form>
    </div>
  );
};
