import { createEvent, restore, sample } from 'effector';
import type { PageContext } from 'nextjs-effector';
import { getPersonByIdFx } from 'shared/api';
import { atom } from 'shared/factory';

export const personModel = atom(() => {
  const pageStarted = createEvent<PageContext>();

  const $person = restore(getPersonByIdFx, null);

  sample({
    clock: pageStarted,
    fn: ({ params }) => params?.id as string,
    target: getPersonByIdFx,
  });

  return {
    pageStarted,
    $person,
  };
});
