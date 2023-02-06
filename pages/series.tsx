import { createGIP } from 'pages/shared';
import { SeriesPage, pageModel } from 'pages/series';

SeriesPage.getInitialProps = createGIP({
  pageEvent: pageModel.pageStarted,
});

export default SeriesPage;
