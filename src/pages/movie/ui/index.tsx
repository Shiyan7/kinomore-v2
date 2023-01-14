import Head from 'next/head';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { MainSection } from './main-section';
import { TrailerModal } from './trailer-modal';
import { ShareModal } from './share-modal';
import { Facts } from './facts';

export const Movie: NextPage = () => {
  const data = useStore(pageModel.$movie);

  const name = data?.name || 'Без названия';
  const year = data?.year && `(${data?.year})`;
  const description = data?.description || data?.shortDescription;

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <title>
          {name} {year} смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве
        </title>
        <meta property="og:title" content={`${name} ${year}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={data?.poster?.url} />
      </Head>
      <MainSection />
      <SimilarMovies />
      <Persons />
      <Facts />
      <TrailerModal />
      <ShareModal />
    </>
  );
};
