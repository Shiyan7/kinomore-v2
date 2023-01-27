import { useRef, useEffect } from 'react';
import { useStore, useEvent } from 'effector-react';
import { authModel } from 'features/auth';
import { sessionModel } from 'entities/session';
import { useForm } from 'shared/lib/effector-react-form';
import { Button } from 'shared/ui/button';
import { Field, Form } from 'shared/form';
import { Authorized } from '../authorized';
import { Message } from '../message';
import { Transition } from '../transition';
import styles from './styles.module.scss';

export const PasswordForm = () => {
  const { handleSubmit, controller } = useForm({ form: authModel.passwordForm, resetUnmount: false });
  const { email } = useStore(authModel.emailForm.$values);
  const pending = useStore(sessionModel.$isLoading);
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
      <Transition offset={30} delay={50}>
        <Message position="right" isEditable onEdit={editClicked} title={email} />
      </Transition>
      <Transition offset={30} delay={80}>
        <Message
          title={isNewUser ? 'Придумайте пароль для входа' : 'Введите пароль, чтобы войти'}
          description={isNewUser ? 'Установите пароль для входа, минимум 6 символов' : ''}
        />
      </Transition>
      <Transition animation="bounceOutUp" startIn={isAuthorizedState} offset={-30} delay={300}>
        <Form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputs}>
            <Transition offset={20} delay={150}>
              <Field.Input
                use={controller({
                  name: 'password',
                })}
                ref={inputRef}
                type="password"
                className={styles.input}
                placeholder={isNewUser ? 'Придумайте пароль' : 'Введите пароль'}
              />
            </Transition>
          </div>
          <Transition offset={40} delay={170}>
            <Button loading={pending} className={styles.btn} type="submit">
              {isNewUser ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Transition>
        </Form>
      </Transition>
      {isAuthorizedState ? <Authorized /> : null}
    </>
  );
};
