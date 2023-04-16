import Image from 'next/image';
import { usePageEvent } from 'nextjs-effector';
import { useEvent, useStore } from 'effector-react';
import { NextPageWithLayout } from 'pages/shared';
import { sessionModel } from 'entities/session';
import styles from './styles.module.scss';

export const ProfilePage: NextPageWithLayout = () => {
  const data = useStore(sessionModel.$session);
  const logout = useEvent(sessionModel.logout);

  usePageEvent(sessionModel.getSession);

  return (
    <div>
      <Image width={150} height={150} alt={data?.email ?? ''} className={styles.avatar} src={data?.photo ?? ''} />
      {data?.email}
      <button onClick={() => logout()}>выйти</button>
    </div>
  );
};
