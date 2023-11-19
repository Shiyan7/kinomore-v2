/* eslint-disable boundaries/element-types */
import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { and, not } from 'patronum';
import { authModel } from 'widgets/auth';
import { refreshQuery, sessionModel } from 'entities/session';
import { MovieEntity } from 'shared/api/types';
import { atom } from 'shared/factory';
import { allFavoritesQuery, checkFavoriteQuery, favoritesIdQuery, toggleFavoriteQuery } from './api';
import { arrayToSearchParams } from './lib';

export const favoritesModel = atom(() => {
  const $pending = createStore(true);

  const $isFavorite = createStore(false);

  const $allFavorites = createStore<MovieEntity[]>([]);

  const $arrayOfId = favoritesIdQuery.$data;

  const FavoritesPageGate = createGate();

  const abortPending = createEvent();

  const toggleFavoriteClicked = createEvent<{ id: number }>();

  const removeFavoriteClicked = createEvent<{ id: number }>();

  sample({
    clock: toggleFavoriteClicked,
    source: $isFavorite,
    filter: sessionModel.$isLogged,
    fn: (isFavorite) => !isFavorite,
    target: $isFavorite,
  });

  sample({
    clock: [toggleFavoriteClicked, removeFavoriteClicked],
    filter: sessionModel.$isLogged,
    target: toggleFavoriteQuery.start,
  });

  sample({
    clock: sessionModel.$isRefreshed,
    source: FavoritesPageGate.open,
    target: favoritesIdQuery.start,
  });

  sample({
    clock: favoritesIdQuery.finished.success,
    filter: ({ result }) => result.items.length > 0,
    fn: ({ result }) => arrayToSearchParams(result.items),
    target: allFavoritesQuery.start,
  });

  sample({
    clock: favoritesIdQuery.finished.success,
    filter: ({ result }) => !result.items.length,
    target: abortPending,
  });

  sample({
    clock: allFavoritesQuery.finished.success,
    source: $arrayOfId,
    filter: Boolean,
    fn: ({ items }, { result }) => result.docs.sort((a, b) => items.indexOf(b.id) - items.indexOf(a.id)),
    target: $allFavorites,
  });

  sample({
    clock: allFavoritesQuery.finished.success,
    target: abortPending,
  });

  sample({
    clock: checkFavoriteQuery.finished.success,
    fn: ({ result }) => result.status,
    target: $isFavorite,
  });

  sample({
    clock: toggleFavoriteClicked,
    filter: and(not(sessionModel.$isLogged), not(refreshQuery.$pending)),
    target: authModel.toggler.open,
  });

  $allFavorites.on(removeFavoriteClicked, (state, { id }) => state?.filter((movie) => movie.id !== id));

  $pending.on(abortPending, () => false);

  return {
    FavoritesPageGate,
    toggleFavoriteClicked,
    removeFavoriteClicked,
    $pending,
    $isFavorite,
    $allFavorites,
  };
});
