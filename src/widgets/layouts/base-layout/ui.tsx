import type { PropsWithChildren } from 'react';
import { usePageEvent } from 'nextjs-effector';
import { Header } from 'widgets/header';
import { AuthWindow } from 'widgets/auth';
import { appStarted } from 'pages/shared';
import { SearchWindow } from 'entities/search-window';

// run process logic for all base layout pages
import 'processes/root';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  usePageEvent(appStarted);

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <SearchWindow />
      <AuthWindow />
    </>
  );
};
