import { useUnit, useGate } from 'effector-react';
import Link from 'next/link';
import { sessionModel } from 'entities/session';
import { paths } from 'shared/routing';
import { Button, Icon, Title } from 'shared/ui';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { Spinner } from 'shared/ui/spinner';
import { breadcrumbs, profileItems } from '../config';
import { profileModel } from '../model';
import styles from './styles.module.scss';

export const ProfilePage = () => {
  const { session, logOut } = useUnit({
    session: profileModel.$session,
    logOut: sessionModel.logOut,
  });

  useGate(profileModel.ProfilePageGate);

  const Loader = (
    <div className={styles.loader}>
      <Spinner />
    </div>
  );

  const Content = (
    <div className={styles.content}>
      <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
      <div className={styles.top}>
        <div className={styles.left}>
          <Title className={styles.name}>{session?.name}</Title>
          <span className={styles.caption}>Основной профиль</span>
        </div>
        <Button
          as={Link}
          className={styles.btn}
          href={paths.home}
          onClick={logOut}
          size="small"
          variant="glass"
        >
          Выйти
        </Button>
      </div>
      <div className={styles.grid}>
        {profileItems.map(({ href, iconName, caption }) => (
          <Link className={styles.item} href={href} key={iconName}>
            <Icon name={iconName} />
            <span>{caption}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  return <div className="container">{!session ? Loader : Content}</div>;
};
