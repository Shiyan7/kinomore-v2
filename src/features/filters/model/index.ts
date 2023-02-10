import type { ParsedUrlQuery } from 'querystring';
import { createEvent, createStore, sample } from 'effector';
import { navigationModel } from 'entities/navigation';
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

export const optionSelected = createEvent<ParsedUrlQuery>();

export const sendOption = createEvent<ParsedUrlQuery>();

const $allParams = createStore<ParsedUrlQuery | null>(null).on(sendOption, (state, payload) => ({
  ...state,
  ...payload,
}));

export const applyResults = createEvent();

/* Передаем все параметры в query только когда вызвался эвент applyResults */

sample({
  clock: applyResults,
  source: $allParams,
  target: [navigationModel.pushQuery, filtersToggler.close],
});

/* Когда что-то выбрали в селекте, сразу напрямую передаём в query */

sample({
  clock: optionSelected,
  target: navigationModel.pushQuery,
});
