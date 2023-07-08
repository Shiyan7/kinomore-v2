import { useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { authModel } from 'widgets/auth';
import { Form, Field } from 'shared/form';
import { paths } from 'shared/routing';
import { Button } from 'shared/ui/button';
import { Link } from 'shared/ui/link';
import { Transition } from '../transition';
import styles from './styles.module.scss';
import { useForm } from '@filledout/react';

export const EmailForm = () => {
  const { onSubmit, fields } = useForm(authModel.emailForm);
  const { email } = useStore(authModel.emailForm.$values);
  const inputRef = useRef<HTMLInputElement>(null);
  const pending = useStore(authModel.checkUserFx.pending);

  console.log(email);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.content}>
      <Form onSubmit={onSubmit} className={styles.form}>
        <Transition offset={20} delay={130}>
          <Field.Input
            field={fields.email}
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
      </Form>
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
