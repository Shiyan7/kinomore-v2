import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEvent, useGate } from 'effector-react';
import { useEffect } from 'react';
import { BaseLayout } from 'widgets/layouts';
import { navigationModel } from 'entities/navigation';
import { withProviders } from './providers';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const routerUpdated = useEvent(navigationModel.routerUpdated);

  useEffect(() => {
    routerUpdated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useGate(navigationModel.RouterGate, { router });

  return (
    <>
      <Head>
        <title>
          Онлайн-кинотеатр Kinomore - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:description" content="Kinomore - фильмы и сериалы" />
        <meta property="og:title" content="Kinomore - фильмы и сериалы" />
        <meta
          name="description"
          content="Устройте кинотеатр у себя дома! Смотрите онлайн фильмы хорошего качества в приятной домашней обстановке и в удобное для вас время. Для вас всегда доступны на любой вкус: сериалы, фильмы, мультфильмы и многое другое."
        />
        <meta
          name="keywords"
          content="фильмы онлайн в хорошем отличном качестве без смс кино видео смотреть новинки кинофильмы онлайн кинотеатр 2020 2021 2022 просмотр видеоролики"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <NextNProgress color="var(--color-primary)" height={3} options={{ showSpinner: false }} />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
};

export default withProviders(App);
