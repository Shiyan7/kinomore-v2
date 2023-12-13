import { allSettled, fork, serialize } from 'effector';
import { FilmsPage } from 'pages/films';
import { catalogModel } from 'widgets/catalog';

FilmsPage.getInitialProps = async (params) => {
  const scope = fork();

  await allSettled(catalogModel.pageStarted, { scope, params });

  return {
    values: serialize(scope),
  };
}

export default FilmsPage;
