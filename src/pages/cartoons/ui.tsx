import type { NextPage } from 'next';
import { useStore } from 'effector-react';
import { Catalog } from 'widgets/catalog';
import { pageModel } from 'pages/cartoons';

export const CartoonsPage: NextPage = () => {
  const data = useStore(pageModel.$cartoons);

  return <Catalog title="Мультфильмы" data={data} />;
};
