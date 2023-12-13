import NextNProgress from 'nextjs-progressbar';
import { EffectorNext } from '@effector/next';
import type { AppProps } from 'next/app';
import { BaseLayout } from 'widgets/layouts';
import { withProviders } from './providers';

const App = ({ Component, pageProps }: AppProps) => (
  <EffectorNext values={pageProps.values}>
    <NextNProgress
      color="var(--color-primary)"
      height={3}
      options={{ showSpinner: false }}
    />
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  </EffectorNext>
);

export default withProviders(App);
