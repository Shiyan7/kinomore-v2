import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { sessionModel } from 'entities/session';
import { and } from 'patronum';
import { atom } from 'shared/factory';
import type { MovieEntity } from 'shared/api/types';
import { arrayToQueryParams, sortByIds } from '../lib';
import { favoritesQuery, moviesQuery } from '../api';

export const favoritesPageModel = atom(() => {
  const FavoritesPageGate = createGate();

  const $pending = createStore(true);

  const $data = createStore<MovieEntity[]>([]);

  const $arrayOfId = favoritesQuery.$data.map((data) => data?.items ?? []);

  sample({
    clock: and(sessionModel.$isRefreshed, FavoritesPageGate.status),
    filter: Boolean,
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

  return {
    FavoritesPageGate,
    $pending,
    $data,
  };
});
