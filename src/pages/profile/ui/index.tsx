import { useEvent, useStore } from 'effector-react';
import Link from 'next/link';
import { usePageEvent } from 'nextjs-effector';
import { sessionModel } from 'entities/session';
import { paths } from 'shared/routing';
import { Button, Icon, Title } from 'shared/ui';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { Spinner } from 'shared/ui/spinner';
import styles from './styles.module.scss';

const breadcrumbs = [
  { text: 'Главная', href: paths.home },
  { text: 'Профиль', href: '' },
];

const items = [
  { href: paths.favorites, caption: 'Избранное', icon: <Icon type="common" name="bookmark2" /> },
  { href: paths.history, caption: 'Просмотренное', icon: <Icon type="common" name="history" /> },
  { href: paths.settings, caption: 'Настройки', icon: <Icon type="common" name="settings" /> },
];

export const ProfilePage = () => {
  const data = useStore(sessionModel.$session);
  const logOut = useEvent(sessionModel.logOut);

  usePageEvent(sessionModel.getMe);

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
        <Button size="small" variant="glass" className={styles.btn} onClick={() => logOut()}>
          Выйти
        </Button>
      </div>
      <div className={styles.items}>
        {items.map(({ href, icon, caption }) => (
          <Link key={href} href={href} className={styles.item}>
            {icon}
            <span>{caption}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  return <div className="container">{!data ? Loader : Content}</div>;
};
