import { useUnit } from 'effector-react';
import { NextSeo } from 'next-seo';
import { personModel } from 'pages/person';
import { Facts } from 'widgets/facts';
import { Filmography } from './filmography';
import { MainSection } from './main-section';

export const PersonPage = () => {
  const { person } = useUnit({ person: personModel.$person });

  const enName = person?.enName ? `(${person?.enName})` : '';
  const title = `${person?.name} ${enName}: Фото, факты`;
  const description = `${person?.name} ${enName}: Факты, фильмография`;

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
              url: person?.photo ?? '',
              alt: title,
            },
          ],
        }}
        title={title}
      />
      <MainSection />
      <Filmography />
      <Facts data={person?.facts} narrow />
    </>
  );
};
