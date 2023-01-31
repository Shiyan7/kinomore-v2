import Head from 'next/head';
import { NextPage } from 'next';
import { useStore } from 'effector-react';
import { Facts } from 'widgets/facts';
import { pageModel } from 'pages/person';
import { MainSection } from './main-section';

export const Person: NextPage = () => {
  const data = useStore(pageModel.$person);

  const enName = data?.enName ? `(${data?.enName})` : '';
  const title = `${data?.name} ${enName}: Биография, Фото, Фильмография`;
  const description = `${data?.name} ${enName}: Дуэйн Джонсон: личная жизнь, биография, фильмография`;

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={data?.photo} />
      </Head>
      <MainSection />
      <Facts narrow facts={data?.facts} />
    </>
  );
};
