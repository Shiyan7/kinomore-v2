import { createEvent, createStore, sample } from 'effector';
import { navigationModel, type QueryPayload } from 'entities/navigation';
import { createToggler, paramsToString } from 'shared/lib';
import { getOption } from '../lib';
import { genres, years } from '../config';

export const filtersToggler = createToggler();

export const $params = createStore('');

const $filters = createStore<Array<string | undefined>>([]);

sample({
  clock: navigationModel.$query,
  filter: Boolean,
  fn: ({ genre, year }) => [getOption(genres, genre as string), getOption(years, year as string)],
  target: $filters,
});

sample({
  clock: navigationModel.$query,
  source: $filters,
  fn: (params) => paramsToString(params as string[]),
  target: $params,
});

interface OptionPayload extends QueryPayload {
  queryName: 'genre' | 'rating' | 'year' | 'sort';
}

export const optionSelected = createEvent<OptionPayload>();

sample({
  clock: optionSelected,
  target: [navigationModel.pushQuery, filtersToggler.close],
});
