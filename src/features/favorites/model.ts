import { createEvent, createStore, sample } from 'effector';
import { and, not } from 'patronum';
import { authModel } from 'widgets/auth';
import { refreshQuery, sessionModel } from 'entities/session';
import { atom } from 'shared/factory';
import { checkFavoriteQuery, toggleFavoriteQuery } from './api';

export const favoritesModel = atom(() => {
  const $isFavorite = createStore(false);

  const toggleFavorite = createEvent<{ id: number }>();

  sample({
    clock: toggleFavorite,
    source: $isFavorite,
    filter: sessionModel.$isLogged,
    fn: (isFavorite) => !isFavorite,
    target: $isFavorite,
  });

  sample({
    clock: toggleFavorite,
    filter: sessionModel.$isLogged,
    target: toggleFavoriteQuery.start,
  });

  sample({
    clock: checkFavoriteQuery.finished.success,
    fn: ({ result }) => result.status,
    target: $isFavorite,
  });

  sample({
    clock: toggleFavorite,
    filter: and(not(sessionModel.$isLogged), not(refreshQuery.$pending)),
    target: authModel.toggler.open,
  });

  return {
    toggleFavorite,
    $isFavorite,
  };
});
