import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { authModel } from 'widgets/auth';
import { useToggler } from 'shared/lib/toggler';
import { Modal } from 'shared/ui/modal';
import { EmailForm } from './email-form';
import { Header } from './header';
import { Message } from './message';
import { PasswordForm } from './password-form';
import styles from './styles.module.scss';
import { Transition } from './transition';

export const AuthWindow = () => {
  const { isOpen, close } = useToggler(authModel.toggler);
  const windowRef = useRef<HTMLDivElement>(null);
  const state = useStore(authModel.$state);
  const isEmailState = state === 'email';

  useEffect(() => {
    windowRef.current?.scrollTo(0, 0);
  }, [isEmailState]);

  return (
    <Modal isOpen={isOpen} close={close} ref={windowRef} className={styles.window}>
      <Header />
      <div className={styles.container}>
        <Transition>
          <Message
            className={styles.message}
            title="Войдите или зарегистрируйтесь"
            description={isEmailState ? 'чтобы пользоваться сервисом на любом устройстве' : null}
          />
        </Transition>
        {isEmailState ? <EmailForm /> : <PasswordForm />}
      </div>
    </Modal>
  );
};
