import { attach, createEvent, createStore, restore, sample } from "effector";
import { debounce } from "patronum";
import { moviesApi as api } from "shared/api";
import { createToggler } from "shared/lib/toggler";

const DEBOUNCE_TIME = 400;

export const searchInstance = createToggler();

export const searchFx = attach({ effect: api.searchByName });
export const $searchResult = restore(searchFx, null);

export const $search = createStore("");

export const searchChanged = createEvent<string>();

export const loadSearchResults = createEvent();

$search.on(searchChanged, (_, payload) => payload);

const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIME,
});

sample({
  clock: debouncedSearchChanged,
  fn: (search) => search,
  target: searchFx,
});

sample({
  clock: loadSearchResults,
  target: searchFx,
});
