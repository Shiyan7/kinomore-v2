import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { and, not } from 'patronum';
import { authModel } from 'widgets/auth';
import { refreshQuery, sessionModel } from 'entities/session';
import type { MovieEntity } from 'shared/api/types';
import { atom } from 'shared/factory';
import {
  moviesQuery,
  checkFavoriteQuery,
  favoritesQuery,
  toggleFavoriteQuery,
} from './api';
import { arrayToQueryParams, sortByIds } from './lib';

export const favoritesModel = atom(() => {
  const FavoritesPageGate = createGate();

  const $pending = createStore(true);

  const $isFavorite = createStore(false);

  const $data = createStore<MovieEntity[]>([]);

  const toggleFavorite = createEvent<{ id: number }>();

  const $arrayOfId = favoritesQuery.$data.map((data) => data?.items ?? []);

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
    clock: sessionModel.$isRefreshed,
    source: FavoritesPageGate.open,
    target: favoritesQuery.start,
  });

  sample({
    clock: favoritesQuery.finished.success,
    source: $arrayOfId,
    fn: arrayToQueryParams,
    target: moviesQuery.start,
  });

  sample({
    clock: moviesQuery.$data,
    source: $arrayOfId,
    fn: (array, data) => sortByIds({ array, data }),
    target: $data,
  });

  sample({
    clock: [favoritesQuery.finished.failure, moviesQuery.finished.success],
    fn: () => false,
    target: $pending,
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
    FavoritesPageGate,
    toggleFavorite,
    $pending,
    $isFavorite,
    $data,
  };
});
