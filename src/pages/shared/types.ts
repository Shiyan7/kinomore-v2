import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type Page = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
