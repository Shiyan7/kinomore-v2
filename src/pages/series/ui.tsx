import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { Catalog } from 'widgets/catalog';
import { pageModel } from 'pages/series';

export const SeriesPage: NextPage = () => {
  const data = useStore(pageModel.$series);

  return <Catalog title="Сериалы" data={data} />;
};
