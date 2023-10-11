import { attach, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { sessionModel } from 'entities/session';
import { MovieEntity, commonApi, internalApi } from 'shared/api';
import { atom } from 'shared/factory';

export const favoritesModel = atom(() => {
  const toggleFavoriteFx = attach({ effect: internalApi.toggleFavorite });
  const getFavoritesIdFx = attach({ effect: internalApi.getFavoritesId });
  const getAllFavoritesFx = attach({ effect: commonApi.getAllFavorites });

  const $pending = createStore(true);
  const $isFavorite = createStore(false);
  const $arrayOfId = createStore<number[]>([]);
  const $allFavorites = createStore<MovieEntity[]>([]);

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
    clock: FavoritesGate.open,
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

  $allFavorites.on(removeFavoriteClicked, (state, { id }) => state?.filter((movie) => movie.id !== Number(id)));

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
