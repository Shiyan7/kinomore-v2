import { useGoogleLogin } from '@react-oauth/google';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import type { FormEventHandler } from 'react';
import { useEffect, useRef } from 'react';
import { authModel } from 'widgets/auth';
import { sessionModel } from 'entities/session';
import { paths } from 'shared/routing';
import { Icon, Input } from 'shared/ui';
import { Button } from 'shared/ui/button';
import { Link } from 'shared/ui/link';
import { TransitionDelays } from '../../config';
import { Transition } from '../transition';
import styles from './styles.module.scss';

export const EmailForm = () => {
  const {
    email,
    emailChanged,
    emailFormSubmitted,
    loginWithGoogle,
    checkUserPending,
  } = useUnit({
    email: authModel.$email,
    emailChanged: authModel.emailChanged,
    emailFormSubmitted: authModel.emailFormSubmitted,
    loginWithGoogle: sessionModel.loginWithGoogle,
    checkUserPending: authModel.$checkUserPending,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: loginWithGoogle,
    flow: 'auth-code',
  });

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
          <button
            className={clsx('btn-reset', styles.logo)}
            onClick={googleLogin}
          >
            <Icon name="common/google" />
          </button>
        </Transition>
        <Transition delay={TransitionDelays.EmailSeparator}>
          <span className={styles.sep}>или</span>
        </Transition>
      </div>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <Transition delay={TransitionDelays.EmailInput} offset={20}>
          <Input
            className={styles.input}
            onChange={(e) => emailChanged(e.target.value)}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            placeholder="Введите email"
            ref={inputRef}
            type="email"
            value={email}
          />
        </Transition>
        <Transition delay={TransitionDelays.ContinueButton} offset={40}>
          <Button
            className={styles.btn}
            disabled={!email}
            loading={checkUserPending}
            type="submit"
          >
            Продолжить
          </Button>
        </Transition>
      </form>
      <Transition delay={TransitionDelays.PolicyText} offset={40}>
        <div className={styles.policy}>
          <span className={styles.caption}>
            Нажимая «Продолжить», я соглашаюсь
          </span>
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
