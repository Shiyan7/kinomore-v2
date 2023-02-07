import { createGIP } from 'pages/shared';
import { HomePage, pageModel } from 'pages/home';

HomePage.getInitialProps = createGIP({
  pageEvent: pageModel.pageStarted,
});

export default HomePage;
