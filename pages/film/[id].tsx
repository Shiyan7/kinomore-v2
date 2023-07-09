/* eslint-disable boundaries/element-types */
import { pageModel } from 'pages/movie';
import { createGSSP } from 'pages/shared';

export const getServerSideProps = createGSSP({
  pageEvent: pageModel.pageStarted,
});

export { MoviePage as default } from 'pages/movie';
