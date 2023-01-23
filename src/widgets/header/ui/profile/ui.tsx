import Link from 'next/link';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import { authModel } from 'features/auth';
import { useToggler } from 'shared/lib/toggler';
import { RoutesEnum } from 'shared/config';
import { ProfileIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const Profile = () => {
  const authWindow = useToggler(authModel.authWindowToggler);
  const isAuth = useStore(authModel.$isAuth);

  const ProfileLink = (
    <Link href={RoutesEnum.Profile} className={styles.profile}>
      <ProfileIcon />
      Профиль
    </Link>
  );

  const ProfileButton = (
    <button onClick={authWindow.open} type="button" className={clsx('btn-reset', styles.profile)}>
      <ProfileIcon />
      Войти
    </button>
  );

  return isAuth ? ProfileLink : ProfileButton;
};
