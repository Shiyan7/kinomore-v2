import { useStore } from 'effector-react';
import { NextSeo } from 'next-seo';
import { usePageEvent } from 'nextjs-effector';
import { pageModel, getPageTitle } from 'pages/movie';
import { Facts } from 'widgets/facts';
import { MainSection } from './main-section';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { Tabs } from './tabs';

export const MoviePage = () => {
  const data = useStore(pageModel.$movie);
  const name = getPageTitle(data?.name);
  const year = data?.year ? `(${data?.year})` : '';
  const description = data?.description ?? data?.shortDescription ?? '';
  const title = `${name} ${year} смотреть онлайн бесплатно в хорошем HD 1080 / 720 качестве`;

  usePageEvent(pageModel.clientStarted);

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
