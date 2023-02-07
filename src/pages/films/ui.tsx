import type { NextPage } from 'next';
import { Catalog } from 'widgets/catalog';

export const FilmsPage: NextPage = () => {
  return <Catalog title="Фильмы" />;
};
