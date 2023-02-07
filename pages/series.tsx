import { catalogModel } from 'widgets/catalog';
import { createGIP } from 'pages/shared';
import { SeriesPage } from 'pages/series';

SeriesPage.getInitialProps = createGIP({
  pageEvent: catalogModel.pageStarted,
});

export default SeriesPage;
