import { useStore } from 'effector-react';
import { NextSeo } from 'next-seo';
import { personModel } from 'pages/person';
import { Facts } from 'widgets/facts';
import { Filmography } from './filmography';
import { MainSection } from './main-section';

export const PersonPage = () => {
  const data = useStore(personModel.$person);

  const enName = data?.enName ? `(${data?.enName})` : '';
  const title = `${data?.name} ${enName}: Фото, факты`;
  const description = `${data?.name} ${enName}: Факты, фильмография`;

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
