import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useEvent } from 'effector-react';
import { useEffect } from 'react';
import { BaseLayout } from 'widgets/layouts';
import { navigationModel } from 'entities/navigation';
import { GOOGLE_CLIENT_ID } from 'shared/config';
import { withProviders } from './providers';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const routerUpdated = useEvent(navigationModel.routerUpdated);

  useEffect(() => {
    routerUpdated(router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Head>
        <title>
          Онлайн-кинотеатр Kinomore - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <NextNProgress color="var(--color-primary)" height={3} options={{ showSpinner: false }} />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </GoogleOAuthProvider>
  );
};

export default withProviders(App);
