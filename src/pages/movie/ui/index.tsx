import Head from 'next/head';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { MainSection } from './main-section';
import { Facts } from './facts';

export const Movie: NextPage = () => {
  const { name, year, description, poster, shortDescription } = useStore(pageModel.$movie)!;

  return (
    <>
      <Head>
        <meta name="description" content={description || shortDescription} />
        <title>
          {name} ({year}) смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве
        </title>
        <meta property="og:title" content={`${name} (${year})`} />
        <meta property="og:description" content={description || shortDescription} />
        <meta property="og:image" content={poster?.url} />
      </Head>
      <MainSection />
      <SimilarMovies />
      <Persons />
      <Facts />
    </>
  );
};
