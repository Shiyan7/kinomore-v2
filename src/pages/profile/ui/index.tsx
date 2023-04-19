import Image from 'next/image';
import { usePageEvent } from 'nextjs-effector';
import { useEvent, useStore } from 'effector-react';
import { NextPageWithLayout } from 'pages/shared';
import { sessionModel } from 'entities/session';
import styles from './styles.module.scss';

export const ProfilePage: NextPageWithLayout = () => {
  const data = useStore(sessionModel.$session);
  const logOut = useEvent(sessionModel.logOut);

  usePageEvent(sessionModel.getSession);

  if (!data) return null;

  return (
    <div className="container">
      <br />
      <Image width={150} height={150} alt={data?.email ?? ''} className={styles.avatar} src={data?.avatar ?? ''} />
      <br />
      <h1>{data?.name}</h1>
      <br />
      <h5>{data?.email}</h5>
      <br />
      <button onClick={() => logOut()}>выйти</button>
    </div>
  );
};
