import { sample, createEvent } from 'effector';
import { sessionModel } from 'entities/session';

export const appStarted = createEvent();

sample({
  clock: appStarted,
  filter: sessionModel.$hasToken,
  fn: () => null,
  target: sessionModel.startRefresh,
});
