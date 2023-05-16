import { and, not } from 'patronum';
import { attach, createEvent, createStore, forward, sample } from 'effector';
import { authModel } from 'widgets/auth';
import { sessionModel } from 'entities/session';
import { internalApi } from 'shared/api';

const toggleFavoriteFx = attach({ effect: internalApi.toggleFavorite });

export const $isFavorite = createStore(false);
export const toggleFavorite = createEvent<{ id: string }>();

forward({
  from: toggleFavorite,
  to: toggleFavoriteFx,
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
