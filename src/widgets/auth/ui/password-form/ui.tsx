import { useStore, useEvent } from 'effector-react';
import { useRef, useEffect } from 'react';
import { authModel } from 'widgets/auth';
import { sessionModel } from 'entities/session';
import { Field, Form, useForm } from 'shared/form';
import { Button } from 'shared/ui/button';
import { Message } from '../message';
import { Transition } from '../transition';
import { maskString } from './lib';
import styles from './styles.module.scss';

export const PasswordForm = () => {
  const { onSubmit, fields } = useForm(authModel.passwordForm);
  const { email } = useStore(authModel.emailForm.$values);
  const { password } = useStore(authModel.passwordForm.$values);
  const maskPassword = maskString(password);
  const pending = useStore(sessionModel.$pending);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNewUser = useStore(authModel.$isNewUser);
  const editClicked = useEvent(authModel.editClicked);
  const state = useStore(authModel.$state);
  const isAuthorizedState = state === 'authorized';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Transition offset={30} delay={80}>
        <Message position="right" isEditable onEdit={editClicked} title={email} />
      </Transition>
      <Transition offset={30} delay={300}>
        <Message
          title={isNewUser ? 'Придумайте пароль для входа' : 'Введите пароль, чтобы войти'}
          description={isNewUser ? 'Установите пароль для входа, минимум 6 символов' : ''}
        />
      </Transition>
      <Transition animation="bounceOutUp" startIn={isAuthorizedState} offset={-30} delay={250}>
        <Form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputs}>
            <Transition offset={20} delay={350}>
              <Field.Input
                ref={inputRef}
                field={fields.password}
                type="password"
                className={styles.input}
                placeholder={isNewUser ? 'Придумайте пароль' : 'Введите пароль'}
              />
            </Transition>
          </div>
          <Transition offset={40} delay={400}>
            <Button loading={pending} className={styles.btn} type="submit">
              {isNewUser ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Transition>
        </Form>
      </Transition>
      {isAuthorizedState && (
        <>
          <Transition offset={30} delay={300}>
            <Message className={styles.message} position="right" title={maskPassword} />
          </Transition>
          <Transition offset={30} delay={600}>
            <Message isSuccess title={isNewUser ? 'Успешная регистрация' : 'Вы успешно вошли'} />
          </Transition>
        </>
      )}
    </>
  );
};
