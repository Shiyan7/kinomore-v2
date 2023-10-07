/* eslint-disable boundaries/element-types */
import { movieModel } from 'pages/movie';
import { createGSSP } from 'pages/shared';

export const getServerSideProps = createGSSP({
  pageEvent: movieModel.pageStarted,
});

export { MoviePage as default } from 'pages/movie';
