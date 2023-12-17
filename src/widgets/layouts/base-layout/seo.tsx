import { NextSeo } from 'next-seo';

export const Seo = () => {
  return (
    <NextSeo
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ]}
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
      description="Устройте кинотеатр у себя дома! Смотрите онлайн фильмы хорошего качества в приятной домашней обстановке и в удобное для вас время. Для вас всегда доступны на любой вкус: сериалы, фильмы, мультфильмы и многое другое."
      nofollow
      noindex
      openGraph={{
        title: 'Kinomore - фильмы и сериалы',
        description: 'Kinomore - фильмы и сериалы',
      }}
      title="Онлайн-кинотеатр Kinomore - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве"
    />
  );
};
