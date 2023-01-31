import Head from 'next/head';
import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { Facts } from 'widgets/facts';
import { pageModel, getPageTitle } from 'pages/movie';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { MainSection } from './main-section';
import { TrailerModal } from './trailer-modal';
import { ShareModal } from './share-modal';
import { GradeModal } from './grade-modal';

export const Movie: NextPage = () => {
  const data = useStore(pageModel.$movie);
  const name = getPageTitle(data?.name);
  const year = data?.year ? `(${data?.year})` : '';
  const description = data?.description ?? data?.shortDescription;
  const title = `${name} ${year} смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве`;

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={data?.poster?.url} />
      </Head>
      <MainSection />
      <SimilarMovies />
      <Persons />
      <Facts facts={data?.facts} />
      <TrailerModal />
      <ShareModal />
      <GradeModal />
    </>
  );
};
