import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { Catalog } from 'widgets/catalog';
import { pageModel } from 'pages/films';

export const FilmsPage: NextPage = () => {
  const data = useStore(pageModel.$films);

  return <Catalog title="Фильмы" data={data} />;
};
