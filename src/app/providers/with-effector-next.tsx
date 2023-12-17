import { EffectorNext } from '@effector/next';
import type { AppProps, AppType } from 'next/app';

export const withEffectorNext = (Component: AppType) => (props: AppProps) => {
  return (
    <EffectorNext values={props.pageProps.values}>
      <Component {...props} />
    </EffectorNext>
  );
};
