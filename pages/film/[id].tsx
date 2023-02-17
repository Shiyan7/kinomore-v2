import { BaseLayout } from 'widgets/layouts';
import { MoviePage, pageModel } from 'pages/movie';
import { createGSSP } from 'pages/shared';

MoviePage.getLayout = (page) => <BaseLayout isHeaderSticky={false}>{page}</BaseLayout>;

export const getServerSideProps = createGSSP({
  pageEvent: pageModel.pageStarted,
});

export default MoviePage;
