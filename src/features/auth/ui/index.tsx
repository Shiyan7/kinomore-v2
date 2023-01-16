import { useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { authModel } from 'features/auth';
import { Modal } from 'shared/ui/modal';
import { useToggler } from 'shared/lib/toggler';
import { EmailForm } from './email-form';
import { Message } from './message';
import { Header } from './header';
import { PasswordForm } from './password-form';
import { Transition } from './transition';
import styles from './styles.module.scss';

export const AuthWindow = () => {
  const authWindow = useToggler(authModel.authWindowToggler);
  const windowRef = useRef<HTMLDivElement>(null);
  const state = useStore(authModel.$state);
  const isEmailState = state === 'email';

  useEffect(() => {
    windowRef.current?.scrollTo(0, 0);
  }, [isEmailState]);

  return (
    <Modal isOpen={authWindow.isOpen} close={authWindow.close} ref={windowRef} className={styles.window}>
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
