import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { authModel } from 'widgets/auth';
import { useToggler } from 'shared/lib/toggler';
import { Icon } from 'shared/ui/icon';
import { Progress } from './progress';
import styles from './styles.module.scss';

export const Header = () => {
  const { close } = useToggler(authModel.toggler);

  const { email, state, isNewUser } = useUnit({
    email: authModel.$email,
    state: authModel.$state,
    isNewUser: authModel.$isNewUser,
  });

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
      <button className={clsx('btn-reset', styles.close)} onClick={close}>
        <Icon name="common/close" />
      </button>
      <Progress />
    </div>
  );
};
