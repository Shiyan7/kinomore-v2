import { pageModel } from 'pages/home';
import { createGSP } from 'pages/shared';

export const getStaticProps = createGSP({
  pageEvent: pageModel.pageStarted,
});

export { HomePage as default } from 'pages/home';
