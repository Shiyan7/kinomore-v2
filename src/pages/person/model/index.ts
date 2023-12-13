import { createEvent, sample } from 'effector';
import { atom } from 'shared/factory';
import { personByIdQuery } from '../api';

export const personModel = atom(() => {
  const pageStarted = createEvent<{ personId: string }>();

  const $person = personByIdQuery.$data;

  sample({
    clock: pageStarted,
    fn: ({ personId }) => personId,
    target: personByIdQuery.start,
  });

  return {
    pageStarted,
    $person,
  };
});
