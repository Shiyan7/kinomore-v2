import { createEvent, sample } from 'effector';
import type { PageContext } from 'nextjs-effector';
import { atom } from 'shared/factory';
import { personByIdQuery } from '../api';

export const personModel = atom(() => {
  const pageStarted = createEvent<PageContext>();

  const $person = personByIdQuery.$data;

  sample({
    clock: pageStarted,
    fn: ({ params }) => params?.id as string,
    target: personByIdQuery.start,
  });

  return {
    pageStarted,
    $person,
  };
});
