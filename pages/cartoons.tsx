import { createGIP } from 'pages/shared';
import { CartoonsPage, pageModel } from 'pages/cartoons';

CartoonsPage.getInitialProps = createGIP({
  pageEvent: pageModel.pageStarted,
});

export default CartoonsPage;
