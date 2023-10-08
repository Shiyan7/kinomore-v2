import { NextSeo } from 'next-seo';
import { ComponentType } from 'react';

export const withSeo =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) =>
    (
      <>
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
        <Component {...props} />
      </>
    );
