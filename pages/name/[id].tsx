/* eslint-disable boundaries/element-types */
import { personModel } from 'pages/person';
import { createGSSP } from 'pages/shared';

export const getServerSideProps = createGSSP({
  pageEvent: personModel.pageStarted,
});

export { PersonPage as default } from 'pages/person';
