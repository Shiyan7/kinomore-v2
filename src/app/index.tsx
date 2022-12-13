import type { AppProps } from "next/app";
import Head from "next/head";
import { BaseLayout } from "shared/ui/layouts";
import { withProviders } from "./providers";

const App = ({ Component, pageProps }: AppProps) => {
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
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
};

export default withProviders(App);
