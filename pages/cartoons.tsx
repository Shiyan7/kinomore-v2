import { CartoonsPage } from 'pages/cartoons';
import { createGIP } from 'pages/shared';
import { catalogModel } from 'widgets/catalog';

CartoonsPage.getInitialProps = createGIP({
  pageEvent: catalogModel.pageStarted,
});

export default CartoonsPage;
