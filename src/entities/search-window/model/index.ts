import { attach, createEvent, createStore, restore, sample } from 'effector';
import { reset, debounce } from 'patronum';
import { commonApi } from 'shared/api';
import { createToggler } from 'shared/lib/toggler';

const DEBOUNCE_TIME = 600;

export const toggler = createToggler();
export const searchByNameFx = attach({ effect: commonApi.searchByName });
export const $searchResult = restore(searchByNameFx, null);
export const searchChanged = createEvent<string>();

export const loadMore = createEvent();
export const $limit = createStore<number>(30);

$limit.on(loadMore, (state) => state + 30);

export const $search = createStore('').on(searchChanged, (_, payload) => payload);
export const $debouncedValue = createStore('');

export const $pending = createStore(false);
export const $loadPending = searchByNameFx.pending;

const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIME,
});

sample({
  clock: debouncedSearchChanged,
  target: [$debouncedValue, $limit.reinit],
});

sample({
  clock: $debouncedValue,
  source: $limit,
  fn: (limit, query) => ({ query, limit }),
  target: searchByNameFx,
});

$pending.on(debouncedSearchChanged, () => true);
$pending.on(searchByNameFx.doneData, () => false);

sample({
  clock: loadMore,
  source: { query: $debouncedValue, limit: $limit },
  target: searchByNameFx,
});

reset({
  clock: toggler.$isOpen,
  target: [$search, $debouncedValue],
});
