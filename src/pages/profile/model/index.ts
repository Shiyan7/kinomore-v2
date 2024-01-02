import { sample } from 'effector';
import { createGate } from 'effector-react';
import { sessionModel, sessionQuery } from 'entities/session';
import { and } from 'patronum';
import { atom } from 'shared/factory';

export const profileModel = atom(() => {
  const ProfilePageGate = createGate();

  const $session = sessionQuery.$data;

  sample({
    clock: and(sessionModel.$isRefreshed, ProfilePageGate.status),
    filter: Boolean,
    target: sessionQuery.start,
  });

  return {
    ProfilePageGate,
    $session,
  };
});
