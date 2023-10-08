import { attach, createEvent, restore, sample } from 'effector';
import type { PageContext } from 'nextjs-effector';
import { commonApi } from 'shared/api';
import { atom } from 'shared/factory';

export const personModel = atom(() => {
  const pageStarted = createEvent<PageContext>();

  const getPersonByIdFx = attach({ effect: commonApi.getPersonById });

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
