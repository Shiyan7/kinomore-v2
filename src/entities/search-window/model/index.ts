import { attach, createEvent, createStore, restore, sample } from 'effector';
import { debounce } from 'patronum';
import { moviesApi } from 'shared/api';
import { createToggler } from 'shared/lib/toggler';

const DEBOUNCE_TIME = 400;

export const searchWindowToggler = createToggler();
export const searchFx = attach({ effect: moviesApi.searchByName });
export const $searchResult = restore(searchFx, null);
export const searchChanged = createEvent<string>();

export const $search = createStore('').on(searchChanged, (_, payload) => payload);
export const $debouncedValue = createStore('');

const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIME,
});

sample({
  clock: debouncedSearchChanged,
  fn: (search) => search,
  target: [searchFx, $debouncedValue],
});
