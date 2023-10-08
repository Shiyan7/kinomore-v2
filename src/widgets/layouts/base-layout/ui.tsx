/* eslint-disable boundaries/element-types */
import type { PropsWithChildren } from 'react';
import { AuthWindow } from 'widgets/auth';
import { Header } from 'widgets/header';
import { SearchWindow } from 'entities/search-window';

// run process logic for all base layout pages
import 'processes/root';

export const BaseLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main className="main">{children}</main>
    <SearchWindow />
    <AuthWindow />
  </>
);
