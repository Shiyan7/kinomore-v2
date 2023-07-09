import clsx from 'clsx';
import { useStore } from 'effector-react';
import Link from 'next/link';
// eslint-disable-next-line boundaries/element-types
import { authModel } from 'widgets/auth';
import { sessionModel } from 'entities/session';
import { useToggler } from 'shared/lib/toggler';
import { paths } from 'shared/routing';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const Profile = () => {
  const { open } = useToggler(authModel.toggler);
  const isLogged = useStore(sessionModel.$isLogged);

  const ProfileLink = (
    <Link href={paths.profile} className={styles.profile}>
      <Icon type="common" name="profile" />
      Профиль
    </Link>
  );

  const ProfileButton = (
    <button onClick={open} className={clsx('btn-reset', styles.profile)}>
      <Icon type="common" name="profile" />
      Войти
    </button>
  );

  return isLogged ? ProfileLink : ProfileButton;
};
