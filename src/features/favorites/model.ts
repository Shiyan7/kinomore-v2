import { and, not } from 'patronum';
import { attach, createEvent, forward, restore, sample } from 'effector';
import { authModel } from 'widgets/auth';
import { appStarted } from 'pages/shared';
import { sessionModel } from 'entities/session';
import { internalApi } from 'shared/api';

const checkFavoriteFx = attach({ effect: internalApi.checkFavorite });
const toggleFavoriteFx = attach({ effect: internalApi.toggleFavorite });

export const $isFavorite = restore(checkFavoriteFx, false);
export const toggleFavorite = createEvent<{ id: string }>();

forward({
  from: toggleFavorite,
  to: toggleFavoriteFx,
});

sample({
  clock: appStarted,
  fn: ({ params }) => params?.id as string,
  target: checkFavoriteFx,
});

sample({
  clock: toggleFavorite,
  source: $isFavorite,
  filter: sessionModel.$isLogged,
  fn: (status) => !status,
  target: $isFavorite,
});

sample({
  clock: toggleFavorite,
  filter: and(not(sessionModel.$isLogged), not(sessionModel.refreshFx.pending)),
  target: authModel.toggler.open,
});
