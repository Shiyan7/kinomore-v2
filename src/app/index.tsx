import NextNProgress from 'nextjs-progressbar';
import { EffectorNext } from '@effector/next';
import { NextSeo } from 'next-seo';
import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useGate } from 'effector-react';
import { BaseLayout } from 'widgets/layouts';
import type { NextPageWithLayout } from 'pages/shared';
import { navigationModel } from 'entities/navigation';
import { withProviders } from './providers';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const getFallbackLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component?.getLayout ?? getFallbackLayout;

  const router = useRouter();

  useGate(navigationModel.RouterGate, { router });

  return (
    <EffectorNext values={pageProps.values}>
      <NextSeo
        nofollow
        noindex
        title="Онлайн-кинотеатр Kinomore - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
        description="Устройте кинотеатр у себя дома! Смотрите онлайн фильмы хорошего качества в приятной домашней обстановке и в удобное для вас время. Для вас всегда доступны на любой вкус: сериалы, фильмы, мультфильмы и многое другое."
        openGraph={{
          title: 'Kinomore - фильмы и сериалы',
          description: 'Kinomore - фильмы и сериалы',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'фильмы онлайн в хорошем отличном качестве без смс кино видео смотреть новинки кинофильмы онлайн кинотеатр 2020 2021 2022 просмотр видеоролики',
          },
          {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1',
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />
      <NextNProgress color="var(--color-primary)" height={3} options={{ showSpinner: false }} />
      {getLayout(<Component {...pageProps} />)}
    </EffectorNext>
  );
};

export default withProviders(App);
