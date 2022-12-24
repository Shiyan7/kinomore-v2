import { attach, createEvent, createStore, restore, sample } from "effector";
import { debounce } from "patronum";
import { navigationModel } from "entities/navigation";
import { moviesApi } from "shared/api";
import { createToggler } from "shared/lib/toggler";

const DEBOUNCE_TIME = 400;

export const searchInstance = createToggler();
export const searchFx = attach({ effect: moviesApi.searchByName });
export const $searchResult = restore(searchFx, null);
export const searchChanged = createEvent<string>();
export const loadSearchResults = createEvent();

export const $search = createStore("")
  .on(searchChanged, (_, payload) => payload)
  .reset(navigationModel.routerUpdated);

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

sample({
  clock: navigationModel.routerUpdated,
  target: searchInstance.close,
});
