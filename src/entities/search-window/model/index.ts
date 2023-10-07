import { attach, createEvent, createStore, sample } from 'effector';
import { reset, debounce } from 'patronum';
import { SearchMovieEntity, commonApi } from 'shared/api';
import { atom } from 'shared/lib/atom';
import { createToggler } from 'shared/lib/toggler';

const DEBOUNCE_TIME = 600;

export const searchModel = atom(() => {
  const toggler = createToggler();
  const searchByNameFx = attach({ effect: commonApi.searchByName });
  const $searchResult = createStore<SearchMovieEntity[]>([]);
  const searchChanged = createEvent<string>();

  const loadMore = createEvent();
  const $page = createStore<number>(1);
  const $hasMore = createStore<boolean>(false);

  $page.on(loadMore, (state) => state + 1);

  const $search = createStore('').on(searchChanged, (_, payload) => payload);
  const $debouncedValue = createStore('');

  const $pending = createStore(false);
  const $loadPending = searchByNameFx.pending;

  const debouncedSearchChanged = debounce({
    source: searchChanged,
    timeout: DEBOUNCE_TIME,
  });

  sample({
    clock: debouncedSearchChanged,
    target: [$debouncedValue],
  });

  sample({
    clock: $debouncedValue,
    source: $page,
    fn: (page, query) => ({ query, page }),
    target: searchByNameFx,
  });

  $pending.on(debouncedSearchChanged, () => true);
  $pending.on(searchByNameFx.doneData, () => false);

  sample({
    clock: loadMore,
    source: { query: $debouncedValue, page: $page },
    target: searchByNameFx,
  });

  reset({
    clock: toggler.$isOpen,
    target: [$search, $debouncedValue],
  });

  reset({
    clock: debouncedSearchChanged,
    target: [$searchResult, $page],
  });

  $searchResult.on(searchByNameFx.doneData, (state, payload) => [...state, ...payload.docs]);

  $hasMore.on(searchByNameFx.doneData, (_, payload) => payload.page !== payload.pages);

  return {
    toggler,
    searchByNameFx,
    $searchResult,
    searchChanged,
    loadMore,
    $page,
    $hasMore,
    $search,
    $debouncedValue,
    $pending,
    $loadPending,
  };
});
