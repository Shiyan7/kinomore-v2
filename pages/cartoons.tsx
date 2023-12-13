import { allSettled, fork, serialize } from 'effector';
import { CartoonsPage } from 'pages/cartoons';
import { catalogModel } from 'widgets/catalog';

CartoonsPage.getInitialProps = async (params) => {
  const scope = fork();

  await allSettled(catalogModel.pageStarted, { scope, params });

  return {
    values: serialize(scope),
  };
};

export default CartoonsPage;
