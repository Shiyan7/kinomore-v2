import { catalogModel } from 'widgets/catalog';
import { createGIP } from 'pages/shared';
import { CartoonsPage } from 'pages/cartoons';

CartoonsPage.getInitialProps = createGIP({
  pageEvent: catalogModel.pageStarted,
});

export default CartoonsPage;
