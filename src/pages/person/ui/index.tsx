import Head from 'next/head';
import { NextPage } from 'next';
import { useStore } from 'effector-react';
import { Facts } from 'widgets/facts';
import { pageModel } from 'pages/person';
import { MainSection } from './main-section';
import { Filmography } from './filmography';
import styles from './styles.module.scss';

export const Person: NextPage = () => {
  const data = useStore(pageModel.$person);

  const enName = data?.enName ? `(${data?.enName})` : '';
  const title = `${data?.name} ${enName}: Фото, факты`;
  const description = `${data?.name} ${enName}: Факты, фильмография`;

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={data?.photo} />
      </Head>
      <MainSection />
      <Facts className={styles.facts} facts={data?.facts} />
      <Filmography />
    </>
  );
};
