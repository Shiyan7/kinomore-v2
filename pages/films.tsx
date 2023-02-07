import { catalogModel } from 'widgets/catalog';
import { createGIP } from 'pages/shared';
import { FilmsPage } from 'pages/films';

FilmsPage.getInitialProps = createGIP({
  pageEvent: catalogModel.pageStarted,
});

export default FilmsPage;
