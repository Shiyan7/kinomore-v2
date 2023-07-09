/* eslint-disable boundaries/element-types */
import { pageModel } from 'pages/person';
import { createGSSP } from 'pages/shared';

export const getServerSideProps = createGSSP({
  pageEvent: pageModel.pageStarted,
});

export { PersonPage as default } from 'pages/person';
