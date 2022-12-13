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
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `@font-face {font-family: __font_083edc;src: url(/fonts/e-Ukraine-Bold.woff2) format("woff2");font-display: swap;font-weight: 700;}@font-face {font-family: __font_083edc;src: url(/fonts/e-Ukraine-Regular.woff2) format("woff2");font-display: swap;font-weight: 400;}@font-face {font-family: __font_083edc;src: url(/fonts/e-Ukraine-Light.woff2) format("woff2");font-display: swap;font-weight: 300;}@font-face {font-family: __font_Fallback_083edc;src: local("Arial");ascent-override: 79.81%;descent-override: 15.53%;line-gap-override: 0%;size-adjust: 125.78%;}#__next {font-family: __font_083edc, __font_Fallback_083edc;}`,
          }}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#141414" />
      </Head>
      <body className="page__body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
