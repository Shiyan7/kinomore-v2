import { PropsWithChildren } from 'react';
import { Header } from 'widgets/header';
import { AuthWindow } from 'features/auth';
import { SearchWindow } from 'entities/search-window';

// run process logic for all base layout pages
import 'processes/root';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className='main'>{children}</main>
      <SearchWindow />
      <AuthWindow />
    </>
  );
};
