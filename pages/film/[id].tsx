import { MoviePage, pageModel } from 'pages/movie';
import { createGSSP } from 'pages/shared';

export const getServerSideProps = createGSSP({
  pageEvent: pageModel.pageStarted,
});

export default MoviePage;
