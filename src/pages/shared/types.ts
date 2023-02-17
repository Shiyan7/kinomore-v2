import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type PageComponent = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
