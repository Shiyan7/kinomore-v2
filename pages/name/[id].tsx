import { PersonPage, pageModel } from 'pages/person';
import { createGSSP } from 'pages/shared';

export const getServerSideProps = createGSSP({
  pageEvent: pageModel.pageStarted,
});

export default PersonPage;
