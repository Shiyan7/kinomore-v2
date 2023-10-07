import { attach, createEvent, createStore, sample } from 'effector';
import { delay, not } from 'patronum';
import { sessionModel } from 'entities/session';
import { MovieEntity, commonApi, internalApi } from 'shared/api';
import { atom } from 'shared/lib/atom';

export const favoritesModel = atom(() => {
  const toggleFavoriteFx = attach({ effect: internalApi.toggleFavorite });
  const getFavoritesIdFx = attach({ effect: internalApi.getFavoritesId });
  const getAllFavoritesFx = attach({ effect: commonApi.getAllFavorites });

  const $pending = createStore(true);
  const $isFavorite = createStore(false);
  const $arrayOfId = createStore<number[]>([]);
  const $allFavorites = createStore<MovieEntity[] | null>(null);

  const abortPending = createEvent();
  const favoritesPageStarted = createEvent();
  const toggleFavorite = createEvent<{ id: string }>();

  sample({
    clock: toggleFavorite,
    source: $isFavorite,
    filter: sessionModel.$isLogged,
    fn: (isFavorite) => !isFavorite,
    target: $isFavorite,
  });

  sample({
    clock: toggleFavorite,
    target: toggleFavoriteFx,
  });

  sample({
    clock: favoritesPageStarted,
    fn: () => null,
    target: getFavoritesIdFx,
  });

  sample({
    clock: getFavoritesIdFx.doneData,
    fn: ({ items }) => items.map(Number),
    target: $arrayOfId,
  });

  sample({
    clock: getFavoritesIdFx.doneData,
    filter: ({ items }) => items.length > 0,
    fn: ({ items }) => items.map((id) => `id=${id}`).join('&'),
    target: getAllFavoritesFx,
  });

  sample({
    clock: delay({ source: favoritesPageStarted, timeout: 1000 }),
    filter: not(sessionModel.$isLogged),
    target: abortPending,
  });

  sample({
    clock: getFavoritesIdFx.doneData,
    filter: ({ items }) => !items.length,
    target: abortPending,
  });

  sample({
    clock: getAllFavoritesFx.doneData,
    source: $arrayOfId,
    fn: (items, { docs }) => docs.sort((a, b) => items.indexOf(b.id) - items.indexOf(a.id)),
    target: [$allFavorites, abortPending],
  });

  $pending.on(abortPending, () => false);

  return {
    favoritesPageStarted,
    toggleFavorite,
    $pending,
    $isFavorite,
    $allFavorites,
  };
});
