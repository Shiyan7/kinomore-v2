import { useGate, useUnit } from 'effector-react';
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
  const { movie } = useUnit({ movie: movieModel.$movie });
  const name = getPageTitle(movie?.name);
  const year = movie?.year ? `(${movie?.year})` : '';
  const description = movie?.description ?? movie?.shortDescription ?? '';
  const title = `${name} ${year} смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве`;

  useGate(movieModel.MoviePageGate, { movieId: query.id as string });

  return (
    <>
      <NextSeo
        description={description}
        nofollow
        noindex
        openGraph={{
          title,
          description,
          images: [
            {
              url: movie?.poster?.url ?? '',
              alt: name,
            },
          ],
        }}
        title={title}
      />
      <MainSection />
      <Tabs />
      <SimilarMovies />
      <Persons />
      <Facts data={movie?.facts} />
    </>
  );
};
