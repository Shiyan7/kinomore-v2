/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import type { ParsedUrlQuery } from 'querystring';
import { createEvent, createStore, sample } from 'effector';
import { navigationModel, type QueryPayload } from 'entities/navigation';
import { paramsToString } from 'shared/lib';
import { getOption } from '../lib';
import { genres, years } from '../config';

export const $query = createStore<ParsedUrlQuery | null>(null);

export const $params = createStore('');

const $filters = createStore<Array<string | undefined>>([]);

sample({
  clock: $query,
  filter: Boolean,
  fn: ({ genre, year }) => [getOption(genres, genre as string), getOption(years, year as string)],
  target: $filters,
});

sample({
  clock: $query,
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
  target: navigationModel.pushQuery,
});
