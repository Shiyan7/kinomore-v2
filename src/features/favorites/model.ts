import { attach, createEvent, createStore, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { sessionModel } from 'entities/session';
import { MovieEntity, commonApi, internalApi } from 'shared/api';
import { atom } from 'shared/factory';
import { arrayToSearchParams } from './lib';

export const favoritesModel = atom(() => {
  const toggleFavoriteFx = attach({ effect: internalApi.toggleFavorite });

  const getFavoritesIdFx = attach({ effect: internalApi.getFavoritesId });

  const getAllFavoritesFx = attach({ effect: commonApi.getAllFavorites });

  const $pending = createStore(true);

  const $isFavorite = createStore(false);

  const $allFavorites = createStore<MovieEntity[]>([]);

  const $arrayOfId = restore(getFavoritesIdFx.doneData, null);

  const FavoritesGate = createGate();

  const abortPending = createEvent();

  const toggleFavorite = createEvent<{ id: number }>();

  const removeFavoriteClicked = createEvent<{ id: number }>();

  sample({
    clock: toggleFavorite,
    source: $isFavorite,
    filter: sessionModel.$isLogged,
    fn: (isFavorite) => !isFavorite,
    target: $isFavorite,
  });

  sample({
    clock: [toggleFavorite, removeFavoriteClicked],
    target: toggleFavoriteFx,
  });

  sample({
    clock: sessionModel.$isRefreshed,
    source: FavoritesGate.open,
    target: getFavoritesIdFx,
  });

  sample({
    clock: getFavoritesIdFx.doneData,
    filter: ({ items }) => items.length > 0,
    fn: ({ items }) => arrayToSearchParams(items),
    target: getAllFavoritesFx,
  });

  sample({
    clock: getFavoritesIdFx.doneData,
    filter: ({ items }) => !items.length,
    target: abortPending,
  });

  sample({
    clock: getAllFavoritesFx.doneData,
    source: $arrayOfId,
    filter: Boolean,
    fn: ({ items }, { docs }) => docs.sort((a, b) => items.indexOf(b.id) - items.indexOf(a.id)),
    target: $allFavorites,
  });

  sample({
    clock: getAllFavoritesFx.doneData,
    target: abortPending,
  });

  $allFavorites.on(removeFavoriteClicked, (state, { id }) => state?.filter((movie) => movie.id !== id));

  $pending.on(abortPending, () => false);

  return {
    FavoritesGate,
    toggleFavorite,
    removeFavoriteClicked,
    $pending,
    $isFavorite,
    $allFavorites,
  };
});
