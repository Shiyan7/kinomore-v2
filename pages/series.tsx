import { SeriesPage } from 'pages/series';
import { allSettled, fork, serialize } from 'effector';
import { catalogModel } from 'widgets/catalog';

SeriesPage.getInitialProps = async (params) => {
  const scope = fork();

  await allSettled(catalogModel.pageStarted, { scope, params });

  return {
    values: serialize(scope),
  };
};

export default SeriesPage;
