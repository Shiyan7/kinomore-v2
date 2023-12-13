import type { PropsWithChildren } from 'react';
import { AuthWindow } from 'widgets/auth';
import { Header } from 'widgets/header';
import { useGate } from 'effector-react';
import { useRouter } from 'next/router';
import { AppGate } from 'shared/config';
import { navigationModel } from 'shared/navigation';
import { SearchWindow } from 'entities/search-window';
import { Notification } from 'entities/notification';

// run process logic for all base layout pages
import 'processes/root';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  useGate(navigationModel.RouterGate, { router });

  useGate(AppGate);

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <SearchWindow />
      <AuthWindow />
      <Notification />
    </>
  );
};
