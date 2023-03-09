import { NextSeo } from 'next-seo';
import { useStore } from 'effector-react';
import { Facts } from 'widgets/facts';
import type { NextPageWithLayout } from 'pages/shared';
import { pageModel } from 'pages/person';
import { MainSection } from './main-section';
import { Filmography } from './filmography';

export const PersonPage: NextPageWithLayout = () => {
  const data = useStore(pageModel.$person);

  const enName = data?.enName ? `(${data?.enName})` : '';
  const title = `${data?.name} ${enName}: Фото, факты`;
  const description = `${data?.name} ${enName}: Факты, фильмография`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: data?.photo ?? '',
              alt: title,
            },
          ],
        }}
      />
      <MainSection />
      <Filmography />
      <Facts narrow data={data?.facts} />
    </>
  );
};
