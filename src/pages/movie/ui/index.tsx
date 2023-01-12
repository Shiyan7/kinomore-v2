import Head from 'next/head';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { MainSection } from './main-section';
import { Facts } from './facts';

export const Movie: NextPage = () => {
  const data = useStore(pageModel.$movie);

  return (
    <>
      <Head>
        <meta name="description" content={data?.description || data?.shortDescription} />
        <title>
          {data?.name} ({data?.year}) смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве
        </title>
        <meta property="og:title" content={`${data?.name} (${data?.year})`} />
        <meta property="og:description" content={data?.description || data?.shortDescription} />
        <meta property="og:image" content={data?.poster?.url} />
      </Head>
      <MainSection />
      <SimilarMovies />
      <Persons />
      <Facts />
    </>
  );
};
