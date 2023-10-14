import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { FormEventHandler, useEffect, useRef } from 'react';
import { authModel } from 'widgets/auth';
import { paths } from 'shared/routing';
import { Icon, Input } from 'shared/ui';
import { Button } from 'shared/ui/button';
import { Link } from 'shared/ui/link';
import { TransitionDelays } from '../../config';
import { Transition } from '../transition';
import styles from './styles.module.scss';

export const EmailForm = () => {
  const email = useStore(authModel.$email);
  const inputRef = useRef<HTMLInputElement>(null);
  const emailChanged = useEvent(authModel.emailChanged);
  const emailFormSubmitted = useEvent(authModel.emailFormSubmitted);
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
      <div className={styles.top}>
        <Transition delay={TransitionDelays.GoogleLogo}>
          <button type="button" className={clsx('btn-reset', styles.logo)}>
            <Icon type="common" name="google" />
          </button>
        </Transition>
        <Transition delay={TransitionDelays.EmailSeparator}>
          <span className={styles.sep}>или</span>
        </Transition>
      </div>
      <form onSubmit={handleSubmitForm} className={styles.form}>
        <Transition offset={20} delay={TransitionDelays.EmailInput}>
          <Input
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            onChange={(e) => emailChanged(e.target.value)}
            value={email}
            ref={inputRef}
            type="email"
            className={styles.input}
            placeholder="Введите email"
          />
        </Transition>
        <Transition offset={40} delay={TransitionDelays.ContinueButton}>
          <Button className={styles.btn} disabled={!email} loading={pending} type="submit">
            Продолжить
          </Button>
        </Transition>
      </form>
      <Transition offset={40} delay={TransitionDelays.PolicyText}>
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
