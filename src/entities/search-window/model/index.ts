import { attach, combine, createEvent, createStore, restore, sample } from 'effector';
import { debounce } from 'patronum/debounce';
import { commonApi } from 'shared/api';
import { createToggler } from 'shared/lib/toggler';

const DEBOUNCE_TIME = 400;

export const searchWindow = createToggler();

export const searchChanged = createEvent<string>();
export const searchMoviesByNameFx = attach({ effect: commonApi.searchMoviesByName });
export const searchPersonsByNameFx = attach({ effect: commonApi.searchPersonsByName });

const $movies = restore(searchMoviesByNameFx, null);
const $persons = restore(searchPersonsByNameFx, null);

export const $searchResult = combine($movies, $persons, (movies, persons) => {
  return { movies: movies?.docs, persons: persons?.docs };
});

export const $search = createStore('').on(searchChanged, (_, payload) => payload);
export const $debouncedValue = createStore('');

const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIME,
});

sample({
  clock: debouncedSearchChanged,
  target: [searchMoviesByNameFx, searchPersonsByNameFx, $debouncedValue],
});

export const $pending = createStore(false);

sample({
  clock: $pending,
  target: [searchMoviesByNameFx.pending, searchMoviesByNameFx.pending],
});
