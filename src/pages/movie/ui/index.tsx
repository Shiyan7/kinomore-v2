import Head from 'next/head';
import { useStore } from 'effector-react';
import { Facts } from 'widgets/facts';
import type { PageComponent } from 'pages/shared';
import { pageModel, getPageTitle } from 'pages/movie';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { MainSection } from './main-section';
import { Tabs } from './tabs';

export const MoviePage: PageComponent = () => {
  const data = useStore(pageModel.$movie);
  const name = getPageTitle(data?.name);
  const year = data?.year ? `(${data?.year})` : '';
  const description = data?.description ?? data?.shortDescription;
  const title = `${name} ${year} смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={data?.poster?.url} />
      </Head>
      <MainSection />
      <Tabs />
      <SimilarMovies />
      <Persons />
      <Facts data={data?.facts} />
    </>
  );
};
