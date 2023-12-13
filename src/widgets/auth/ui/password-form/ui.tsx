import { useUnit } from 'effector-react';
import type { FormEventHandler } from 'react';
import { useRef, useEffect } from 'react';
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
  const {
    email,
    password,
    pending,
    isNewUser,
    editClicked,
    passwordFormSubmitted,
    passwordChanged,
    state,
  } = useUnit({
    email: authModel.$email,
    password: authModel.$password,
    pending: sessionModel.$pending,
    isNewUser: authModel.$isNewUser,
    editClicked: authModel.editClicked,
    passwordFormSubmitted: authModel.passwordFormSubmitted,
    passwordChanged: authModel.passwordChanged,
    state: authModel.$state,
  });

  const maskPassword = maskString(password);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAuthorizedState = state === 'authorized';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmitForm: FormEventHandler = (e) => {
    e.preventDefault();
    passwordFormSubmitted({ email, password });
  };

  return (
    <>
      <Transition delay={TransitionDelays.EmailInMessage} offset={30}>
        <Message
          isEditable
          onEdit={editClicked}
          position="right"
          title={email}
        />
      </Transition>
      <Transition delay={TransitionDelays.PasswordMessage} offset={30}>
        <Message
          description={
            isNewUser ? 'Установите пароль для входа, минимум 6 символов' : ''
          }
          title={
            isNewUser
              ? 'Придумайте пароль для входа'
              : 'Введите пароль, чтобы войти'
          }
        />
      </Transition>
      <Transition
        animation="bounceOutUp"
        delay={TransitionDelays.PasswordForm}
        offset={-30}
        startIn={isAuthorizedState}
      >
        <form className={styles.form} onSubmit={handleSubmitForm}>
          <div className={styles.inputs}>
            <Transition delay={TransitionDelays.PasswordInput} offset={20}>
              <Input
                className={styles.input}
                minLength={6}
                onChange={(e) => passwordChanged(e.target.value)}
                placeholder={isNewUser ? 'Придумайте пароль' : 'Введите пароль'}
                ref={inputRef}
                togglePassword
                type="password"
                value={password}
              />
            </Transition>
          </div>
          <Transition delay={TransitionDelays.PasswordButton} offset={20}>
            <Button className={styles.btn} loading={pending} type="submit">
              {isNewUser ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Transition>
        </form>
      </Transition>
      {isAuthorizedState ? (
        <>
          <Transition delay={TransitionDelays.PasswordInMessage} offset={30}>
            <Message
              className={styles.message}
              position="right"
              title={maskPassword}
            />
          </Transition>
          <Transition delay={TransitionDelays.SuccessMessage} offset={30}>
            <Message
              isSuccess
              title={isNewUser ? 'Успешная регистрация' : 'Вы успешно вошли'}
            />
          </Transition>
        </>
      ) : null}
    </>
  );
};
