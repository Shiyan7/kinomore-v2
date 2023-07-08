import { FilmsPage } from 'pages/films';
import { createGIP } from 'pages/shared';
import { catalogModel } from 'widgets/catalog';

FilmsPage.getInitialProps = createGIP({
  pageEvent: catalogModel.pageStarted,
});

export default FilmsPage;
