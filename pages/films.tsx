import { createGIP } from 'pages/shared';
import { FilmsPage, pageModel } from 'pages/films';

FilmsPage.getInitialProps = createGIP({
  pageEvent: pageModel.pageStarted,
});

export default FilmsPage;
