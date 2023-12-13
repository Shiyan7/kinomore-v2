import clsx from 'clsx';
import Link from 'next/link';
import { useUnit } from 'effector-react';
import { authModel } from 'widgets/auth';
import { sessionModel } from 'entities/session';
import { useToggler } from 'shared/lib/toggler';
import { paths } from 'shared/routing';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const Profile = () => {
  const { open } = useToggler(authModel.toggler);
  const { isLogged } = useUnit({ isLogged: sessionModel.$isLogged });

  const ProfileLink = (
    <Link className={styles.profile} href={paths.profile}>
      <Icon name="common/profile" />
      Профиль
    </Link>
  );

  const ProfileButton = (
    <button className={clsx('btn-reset', styles.profile)} onClick={open}>
      <Icon name="common/profile" />
      Войти
    </button>
  );

  return isLogged ? ProfileLink : ProfileButton;
};
