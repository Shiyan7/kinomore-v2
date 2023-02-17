import Head from 'next/head';
import { useStore } from 'effector-react';
import { Facts } from 'widgets/facts';
import type { Page } from 'pages/shared';
import { pageModel } from 'pages/person';
import { MainSection } from './main-section';
import { Filmography } from './filmography';

export const PersonPage: Page = () => {
  const data = useStore(pageModel.$person);

  const enName = data?.enName ? `(${data?.enName})` : '';
  const title = `${data?.name} ${enName}: Фото, факты`;
  const description = `${data?.name} ${enName}: Факты, фильмография`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={data?.photo} />
      </Head>
      <MainSection />
      <Filmography />
      <Facts narrow facts={data?.facts} />
    </>
  );
};
