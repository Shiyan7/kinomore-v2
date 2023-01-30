import clsx from 'clsx';
import { useStore } from 'effector-react';
import { authModel } from 'features/auth';
import { useToggler } from 'shared/lib/toggler';
import { CloseIcon } from 'shared/ui/icons';
import { Progress } from './progress';
import styles from './styles.module.scss';

export const Header = () => {
  const { email } = useStore(authModel.emailForm.$values);
  const authWindow = useToggler(authModel.authWindow);
  const state = useStore(authModel.$state);
  const isNewUser = useStore(authModel.$isNewUser);
  const isEmailState = state === 'email';

  const headerTitle = isNewUser ? 'Новый пользователь' : 'Здравствуйте';

  return (
    <div className={styles.header}>
      {isEmailState ? (
        <span className={styles.title}>Вход или регистрация</span>
      ) : (
        <div className={styles.text}>
          <span className={styles.title}>{headerTitle}</span>
          <span className={styles.email}>{email}</span>
        </div>
      )}
      <button className={clsx('btn-reset', styles.close)} type="button" onClick={authWindow.close}>
        <CloseIcon />
      </button>
      <Progress />
    </div>
  );
};
