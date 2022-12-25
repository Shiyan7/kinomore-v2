import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEvent } from "effector-react";
import { useEffect } from "react";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { navigationModel } from "entities/navigation";
import { BaseLayout } from "shared/ui/layouts";
import { withProviders } from "./providers";

const App = ({ Component, pageProps }: AppProps) => {
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
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
};

export default withProviders(App);
