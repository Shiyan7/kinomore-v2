import type { ParsedUrlQuery } from 'node:querystring';
import { createEvent, createStore, sample } from 'effector';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib';
import { navigationModel } from 'shared/navigation';

export const filtersModel = atom(() => {
  const toggler = createToggler();

  const optionSelected = createEvent<ParsedUrlQuery>();

  const mobileOptionSelected = createEvent<ParsedUrlQuery>();

  const showResultsClicked = createEvent();

  const $filters = createStore<ParsedUrlQuery | null>(null);

  $filters.on(mobileOptionSelected, (state, payload) => ({
    ...state,
    ...payload,
  }));

  sample({
    clock: optionSelected,
    target: navigationModel.pushQueryFx,
  });

  sample({
    clock: showResultsClicked,
    source: $filters,
    target: [navigationModel.pushQueryFx, toggler.close],
  });

  return {
    toggler,
    optionSelected,
    mobileOptionSelected,
    showResultsClicked,
  };
});
