import { useGate } from 'effector-react';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import { BaseLayout } from 'widgets/layouts';
import { AppGate } from 'shared/config';
import { navigationModel } from 'shared/navigation';
import { withProviders } from './providers';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useGate(navigationModel.RouterGate, { router });

  useGate(AppGate);

  return (
    <>
      <NextNProgress color="var(--color-primary)" height={3} options={{ showSpinner: false }} />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
};

export default withProviders(App);
