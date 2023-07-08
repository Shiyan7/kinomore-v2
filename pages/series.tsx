import { SeriesPage } from 'pages/series';
import { createGIP } from 'pages/shared';
import { catalogModel } from 'widgets/catalog';

SeriesPage.getInitialProps = createGIP({
  pageEvent: catalogModel.pageStarted,
});

export default SeriesPage;
