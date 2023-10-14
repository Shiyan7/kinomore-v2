import { useStore, useEvent } from 'effector-react';
import { useRef, useEffect, FormEventHandler } from 'react';
import { authModel } from 'widgets/auth';
import { sessionModel } from 'entities/session';
import { Input } from 'shared/ui';
import { Button } from 'shared/ui/button';
import { TransitionDelays } from '../../config';
import { Message } from '../message';
import { Transition } from '../transition';
import { maskString } from './lib';
import styles from './styles.module.scss';

export const PasswordForm = () => {
  const email = useStore(authModel.$email);
  const password = useStore(authModel.$password);
  const maskPassword = maskString(password);
  const pending = useStore(sessionModel.$pending);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNewUser = useStore(authModel.$isNewUser);
  const editClicked = useEvent(authModel.editClicked);
  const passwordFormSubmit = useEvent(authModel.passwordFormSubmitted);
  const passwordChanged = useEvent(authModel.passwordChanged);
  const state = useStore(authModel.$state);
  const isAuthorizedState = state === 'authorized';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmitForm: FormEventHandler = (e) => {
    e.preventDefault();
    passwordFormSubmit({ email, password });
  };

  return (
    <>
      <Transition offset={30} delay={TransitionDelays.EmailInMessage}>
        <Message position="right" isEditable onEdit={editClicked} title={email} />
      </Transition>
      <Transition offset={30} delay={TransitionDelays.PasswordMessage}>
        <Message
          title={isNewUser ? 'Придумайте пароль для входа' : 'Введите пароль, чтобы войти'}
          description={isNewUser ? 'Установите пароль для входа, минимум 6 символов' : ''}
        />
      </Transition>
      <Transition
        animation="bounceOutUp"
        startIn={isAuthorizedState}
        offset={-30}
        delay={TransitionDelays.PasswordForm}
      >
        <form onSubmit={handleSubmitForm} className={styles.form}>
          <div className={styles.inputs}>
            <Transition offset={20} delay={TransitionDelays.PasswordInput}>
              <Input
                togglePassword
                minLength={6}
                onChange={(e) => passwordChanged(e.target.value)}
                ref={inputRef}
                value={password}
                type="password"
                className={styles.input}
                placeholder={isNewUser ? 'Придумайте пароль' : 'Введите пароль'}
              />
            </Transition>
          </div>
          <Transition offset={20} delay={TransitionDelays.PasswordButton}>
            <Button loading={pending} className={styles.btn} type="submit">
              {isNewUser ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Transition>
        </form>
      </Transition>
      {isAuthorizedState && (
        <>
          <Transition offset={30} delay={TransitionDelays.PasswordInMessage}>
            <Message className={styles.message} position="right" title={maskPassword} />
          </Transition>
          <Transition offset={30} delay={TransitionDelays.SuccessMessage}>
            <Message isSuccess title={isNewUser ? 'Успешная регистрация' : 'Вы успешно вошли'} />
          </Transition>
        </>
      )}
    </>
  );
};
