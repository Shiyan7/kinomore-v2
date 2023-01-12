import Link from 'next/link';
import clsx from 'clsx';
import { authModel } from 'features/auth';
import { useToggler } from 'shared/lib/hooks';
import { RoutesEnum } from 'shared/config';
import { ProfileIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const Profile = () => {
  const authWindow = useToggler(authModel.authWindowToggler);

  const isAuth = false;

  const ProfileLink = (
    <Link href={RoutesEnum.Cabinet} className={styles.profile}>
      <ProfileIcon />
      Кабинет
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
