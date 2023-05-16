import type { ParsedUrlQuery } from 'querystring';
import { createEvent, createStore, sample } from 'effector';
import { navigationModel } from 'entities/navigation';
import { createToggler, paramsToString } from 'shared/lib';
import { getOption } from '../lib';
import { genres, years } from '../config';

export const toggler = createToggler();

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

export const $allParams = createStore<ParsedUrlQuery | null>(null).on(sendOption, (state, payload) => ({
  ...state,
  ...payload,
}));

export const showResults = createEvent();

/* Передаем все параметры в query только когда вызвался эвент showResults */

sample({
  clock: showResults,
  source: $allParams,
  target: [navigationModel.pushQueryFx, toggler.close],
});

/* Когда что-то выбрали в селекте, сразу напрямую передаём в query */

sample({
  clock: optionSelected,
  target: navigationModel.pushQueryFx,
});
