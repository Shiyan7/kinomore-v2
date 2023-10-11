import { useGate, useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { movieModel, getPageTitle } from 'pages/movie';
import { Facts } from 'widgets/facts';
import { MainSection } from './main-section';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { Tabs } from './tabs';

export const MoviePage = () => {
  const { query } = useRouter();
  const data = useStore(movieModel.$movie);
  const name = getPageTitle(data?.name);
  const year = data?.year ? `(${data?.year})` : '';
  const description = data?.description ?? data?.shortDescription ?? '';
  const title = `${name} ${year} смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве`;

  useGate(movieModel.MovieGate, { movieId: query.id as string });

  return (
    <>
      <NextSeo
        nofollow
        noindex
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: data?.poster?.url ?? '',
              alt: name,
            },
          ],
        }}
      />
      <MainSection />
      <Tabs />
      <SimilarMovies />
      <Persons />
      <Facts data={data?.facts} />
    </>
  );
};
