import type { PropsWithChildren } from 'react';
import { usePageEvent } from 'nextjs-effector';
import { Header } from 'widgets/header';
import { appStarted } from 'pages/shared';
import { AuthWindow } from 'features/auth';
import { SearchWindow } from 'entities/search-window';

// run process logic for all base layout pages
import 'processes/root';

interface BaseLayoutProps extends PropsWithChildren {
  isHeaderSticky?: boolean;
}

export const BaseLayout = ({ children, isHeaderSticky = true }: BaseLayoutProps) => {
  usePageEvent(appStarted, { runOnce: true });

  return (
    <>
      <Header isSticky={isHeaderSticky} />
      <main className="main">{children}</main>
      <SearchWindow />
      <AuthWindow />
    </>
  );
};
