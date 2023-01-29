import { useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { authModel } from 'features/auth';
import { useForm } from 'shared/lib/effector-react-form';
import { Form, Field } from 'shared/form';
import { paths } from 'shared/routing';
import { Button } from 'shared/ui/button';
import { Link } from 'shared/ui/link';
import { Transition } from '../transition';
import styles from './styles.module.scss';

export const EmailForm = () => {
  const { controller, handleSubmit } = useForm({ form: authModel.emailForm, resetUnmount: false });
  const { email } = useStore(authModel.emailForm.$values);
  const inputRef = useRef<HTMLInputElement>(null);
  const pending = useStore(authModel.checkUserFx.pending);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.content}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Transition offset={20} delay={130}>
          <Field.Input
            use={controller({
              name: 'email',
            })}
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
