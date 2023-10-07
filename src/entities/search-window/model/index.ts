import { attach, createEvent, createStore, sample } from 'effector';
import { reset, debounce } from 'patronum';
import { SearchMovieEntity, commonApi } from 'shared/api';
import { atom } from 'shared/lib/atom';
import { createToggler } from 'shared/lib/toggler';

const DEBOUNCE_TIME = 600;

export const searchModel = atom(() => {
  const searchToggler = createToggler();

  const searchByNameFx = attach({ effect: commonApi.searchByName });

  const searchChanged = createEvent<string>();
  const loadMore = createEvent();

  const $searchResult = createStore<SearchMovieEntity[]>([]);
  const $debouncedValue = createStore('');
  const $hasMore = createStore(false);
  const $searchPending = createStore(false);
  const $search = createStore('');
  const $page = createStore(1);

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

  sample({
    clock: loadMore,
    source: { query: $debouncedValue, page: $page },
    target: searchByNameFx,
  });

  reset({
    clock: searchToggler.$isOpen,
    target: [$search, $debouncedValue],
  });

  reset({
    clock: debouncedSearchChanged,
    target: [$searchResult, $page],
  });

  $searchPending.on(debouncedSearchChanged, () => true);

  $searchPending.on(searchByNameFx.doneData, () => false);

  $searchResult.on(searchByNameFx.doneData, (state, payload) => [...state, ...payload.docs]);

  $hasMore.on(searchByNameFx.doneData, (_, payload) => payload.page !== payload.pages);

  $search.on(searchChanged, (_, payload) => payload);

  $page.on(loadMore, (state) => state + 1);

  return {
    searchToggler,
    searchByNameFx,
    $searchResult,
    searchChanged,
    loadMore,
    $page,
    $hasMore,
    $search,
    $debouncedValue,
    $searchPending,
    $loadPending,
  };
});
