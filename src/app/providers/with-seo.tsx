/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { NextSeo } from 'next-seo';
import { ComponentType } from 'react';

export const withSeo =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <>
        <NextSeo
          title="Dr.Danich — современная стоматология"
          description="Не упустите возможность обрести красивую и здоровую улыбку, о которой вы всегда мечтали"
          openGraph={{
            title: 'Dr.Danich — современная стоматология',
            description: 'Не упустите возможность обрести красивую и здоровую улыбку, о которой вы всегда мечтали',
          }}
          additionalMetaTags={[
            {
              name: 'keywords',
              content: 'Не упустите возможность обрести красивую и здоровую улыбку, о которой вы всегда мечтали',
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
