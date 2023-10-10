import { useEvent, useStore } from 'effector-react';
import { FormEventHandler, useEffect, useRef } from 'react';
import { authModel } from 'widgets/auth';
import { paths } from 'shared/routing';
import { Input } from 'shared/ui';
import { Button } from 'shared/ui/button';
import { Link } from 'shared/ui/link';
import { Transition } from '../transition';
import styles from './styles.module.scss';

export const EmailForm = () => {
  const email = useStore(authModel.emailForm.$value);
  const isEmailError = useStore(authModel.emailForm.$isError);
  const inputRef = useRef<HTMLInputElement>(null);
  const emailChanged = useEvent(authModel.emailForm.changed);
  const emailFormSubmitted = useEvent(authModel.emailForm.submit);
  const pending = useStore(authModel.$checkUserPending);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmitForm: FormEventHandler = (e) => {
    e.preventDefault();
    emailFormSubmitted();
  };

  return (
    <div className={styles.content}>
      <form noValidate onSubmit={handleSubmitForm} className={styles.form}>
        <Transition offset={20} delay={130}>
          <Input
            hasError={isEmailError}
            onChange={(e) => emailChanged(e.target.value)}
            value={email}
            ref={inputRef}
            type="email"
            className={styles.input}
            placeholder="Введите email"
          />
        </Transition>
        <Transition offset={40} delay={150}>
          <Button className={styles.btn} disabled={!email} loading={pending} type="submit">
            Продолжить
          </Button>
        </Transition>
      </form>
      <Transition offset={40} delay={185}>
        <div className={styles.policy}>
          <span className={styles.caption}>Нажимая «Продолжить», я соглашаюсь</span>
          <span className={styles.caption}>
            с <Link href={paths.policy}>Политикой конфиденциальности</Link>
          </span>
          <span className={styles.caption}>
            с <Link href={paths.policy}>Пользовательским соглашением</Link>
          </span>
        </div>
      </Transition>
    </div>
  );
};
