import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEvent } from "effector-react/scope";
import { ReactNode, useEffect, ReactElement } from "react";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { navigationModel } from "entities/navigation";
import { BaseLayout } from "shared/ui/layouts";
import { withProviders } from "./providers";


type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
};

const getFallbackLayout: (page: ReactElement) => ReactNode = (page) => page;

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	const getLayout = Component?.getLayout ?? getFallbackLayout;
  const router = useRouter();
  const routerUpdated = useEvent(navigationModel.routerUpdated);

  useEffect(() => {
    routerUpdated(router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <Head>
        <title>
          Онлайн-кинотеатр Kinomore - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве
        </title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <NextNProgress color="var(--color-primary)" height={3} options={{ showSpinner: false }} />
			{getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default withProviders(App);
