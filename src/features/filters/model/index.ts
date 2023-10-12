import type { ParsedUrlQuery } from 'querystring';
import { createEvent, createStore, sample } from 'effector';
import { atom } from 'shared/factory';
import { createToggler, paramsToString } from 'shared/lib';
import { navigationModel } from 'shared/navigation';
import { genres, years } from '../config';
import { getOption } from '../lib';

export const filtersModel = atom(() => {
  const toggler = createToggler();

  const $params = createStore('');

  const $filters = createStore<Array<string | undefined>>([]);

  const optionSelected = createEvent<ParsedUrlQuery>();

  const sendOption = createEvent<ParsedUrlQuery>();

  const showResults = createEvent();

  const $allParams = createStore<ParsedUrlQuery | null>(null);

  sample({
    clock: optionSelected,
    target: navigationModel.pushQueryFx,
  });

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

  $allParams.on(sendOption, (state, payload) => ({
    ...state,
    ...payload,
  }));

  sample({
    clock: showResults,
    source: $allParams,
    target: [navigationModel.pushQueryFx, toggler.close],
  });

  return {
    toggler,
    $params,
    optionSelected,
    sendOption,
    $allParams,
    showResults,
  };
});
