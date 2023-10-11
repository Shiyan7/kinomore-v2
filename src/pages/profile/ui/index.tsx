import { useEvent, useGate, useStore } from 'effector-react';
import Link from 'next/link';
import { sessionModel } from 'entities/session';
import { paths } from 'shared/routing';
import { Button, Icon, Title } from 'shared/ui';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { Spinner } from 'shared/ui/spinner';
import { breadcrumbs, profileItems } from '../config';
import styles from './styles.module.scss';

export const ProfilePage = () => {
  const data = useStore(sessionModel.$session);
  const logOut = useEvent(sessionModel.logOut);

  useGate(sessionModel.ProfileGate);

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
          <Title className={styles.name}>{data?.name}</Title>
          <span className={styles.caption}>Основной профиль</span>
        </div>
        <Button
          as={Link}
          href={paths.home}
          size="small"
          variant="glass"
          className={styles.btn}
          onClick={() => logOut()}
        >
          Выйти
        </Button>
      </div>
      <div className={styles.grid}>
        {profileItems.map(({ href, iconName, caption }) => (
          <Link key={iconName} href={href} className={styles.item}>
            <Icon type="common" name={iconName} />
            <span>{caption}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  return <div className="container">{!data ? Loader : Content}</div>;
};
