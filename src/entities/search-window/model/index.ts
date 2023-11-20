import { createEvent, createStore, sample } from 'effector';
import { reset, debounce } from 'patronum';
import type { SearchMovieEntity } from 'shared/api/types';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';
import { searchByNameQuery } from '../api';

const DEBOUNCE_TIME = 600;

export const searchModel = atom(() => {
  const toggler = createToggler();

  const searchChanged = createEvent<string>();

  const loadMore = createEvent();

  const $searchResult = createStore<SearchMovieEntity[]>([]);

  const $query = createStore('');

  const $hasMore = createStore(false);

  const $searchPending = createStore(false);

  const $search = createStore('');

  const $page = createStore(1);

  const $loadPending = searchByNameQuery.$pending;

  const debouncedSearchChanged = debounce({
    source: searchChanged,
    timeout: DEBOUNCE_TIME,
  });

  sample({
    clock: debouncedSearchChanged,
    target: $query,
  });

  sample({
    clock: $query,
    source: $page,
    fn: (page, query) => ({ query, page }),
    target: searchByNameQuery.start,
  });

  sample({
    clock: loadMore,
    source: { query: $query, page: $page },
    target: searchByNameQuery.start,
  });

  reset({
    clock: toggler.$isOpen,
    target: [$search, $query],
  });

  reset({
    clock: debouncedSearchChanged,
    target: [$searchResult, $page],
  });

  $searchPending.on(debouncedSearchChanged, () => true);

  $searchPending.on(searchByNameQuery.finished.success, () => false);

  $searchResult.on(searchByNameQuery.finished.success, (state, { result }) => [
    ...state,
    ...result.docs,
  ]);

  $hasMore.on(
    searchByNameQuery.finished.success,
    (_, { result }) => result.page !== result.pages
  );

  $search.on(searchChanged, (_, payload) => payload);

  $page.on(loadMore, (state) => state + 1);

  return {
    toggler,
    $searchResult,
    searchChanged,
    loadMore,
    $page,
    $hasMore,
    $search,
    $query,
    $searchPending,
    $loadPending,
  };
});
