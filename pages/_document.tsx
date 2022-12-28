import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="page" lang="ru">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />

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
        <link rel="preload" href="/fonts/e-Ukraine-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/e-Ukraine-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/e-Ukraine-Light.woff2" as="font" type="font/woff2" crossOrigin="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#000" />
      </Head>
      <body className="page__body">
        <Main />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
